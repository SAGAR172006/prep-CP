import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, createUnauthorizedResponse } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { calculateLeague } from '@/lib/utils/helpers';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const userId = await getUserFromRequest(request);
    if (!userId) {
      return createUnauthorizedResponse();
    }
    
    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        points: true,
        localLeague: true,
        localSubLeague: true,
        cpLeague: true,
        cpSubLeague: true,
      },
    });
    
    if (!user) {
      return createUnauthorizedResponse();
    }
    
    // Calculate league info
    const league = calculateLeague(user.points);
    
    // Get users in same league for ranking
    const leagueUsers = await prisma.user.findMany({
      where: {
        localLeague: league.league,
      },
      select: {
        id: true,
        username: true,
        points: true,
        avatar: true,
      },
      orderBy: {
        points: 'desc',
      },
      take: 100,
    });
    
    // Find user's rank in league
    const userRank = leagueUsers.findIndex(u => u.id === userId) + 1;
    
    // Calculate points to next sub-league
    const pointsToNext = league.max - user.points;
    
    return NextResponse.json({
      success: true,
      league: {
        name: league.league,
        subLeague: league.subLeague,
        min: league.min,
        max: league.max,
        points: user.points,
        progress: ((user.points - league.min) / (league.max - league.min)) * 100,
        rank: userRank,
        totalUsers: leagueUsers.length,
        pointsToNext,
      },
      cpLeague: {
        name: user.cpLeague,
        subLeague: user.cpSubLeague,
      },
      topUsers: leagueUsers.slice(0, 10),
    });
  } catch (error) {
    console.error('League info error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
