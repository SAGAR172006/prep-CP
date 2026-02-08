import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, createUnauthorizedResponse } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { pointsSchema } from '@/lib/utils/validation';
import { calculateLeague } from '@/lib/utils/helpers';
import { updateLeaderboard } from '@/lib/db/redis';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const userId = await getUserFromRequest(request);
    if (!userId) {
      return createUnauthorizedResponse();
    }
    
    const body = await request.json();
    
    // Validate input
    const validationResult = pointsSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.errors },
        { status: 400 }
      );
    }
    
    const { points, reason } = validationResult.data;
    
    // Get current user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        points: true,
        localLeague: true,
        localSubLeague: true,
      },
    });
    
    if (!user) {
      return createUnauthorizedResponse();
    }
    
    // Calculate new points
    const newPoints = Math.max(0, user.points + points);
    const league = calculateLeague(newPoints);
    
    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        points: newPoints,
        localLeague: league.league,
        localSubLeague: league.subLeague,
      },
      select: {
        id: true,
        points: true,
        localLeague: true,
        localSubLeague: true,
      },
    });
    
    // Update leaderboard in Redis
    await updateLeaderboard(userId, newPoints, league.league);
    
    // Create notification if significant points change
    if (Math.abs(points) >= 10) {
      await prisma.notification.create({
        data: {
          userId,
          type: points > 0 ? 'points_awarded' : 'points_deducted',
          title: points > 0 ? 'Points Earned!' : 'Points Deducted',
          message: `You ${points > 0 ? 'earned' : 'lost'} ${Math.abs(points)} points${reason ? `: ${reason}` : ''}`,
        },
      });
    }
    
    return NextResponse.json({
      success: true,
      user: updatedUser,
      pointsChange: points,
      league: {
        name: league.league,
        subLeague: league.subLeague,
        min: league.min,
        max: league.max,
        progress: ((newPoints - league.min) / (league.max - league.min)) * 100,
      },
    });
  } catch (error) {
    console.error('Points update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
