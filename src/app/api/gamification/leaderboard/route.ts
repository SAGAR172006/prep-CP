import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth/session';
import { getLeaderboard, getUserRank } from '@/lib/db/redis';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'global'; // global, course, local
    const league = searchParams.get('league');
    const userId = await getUserFromRequest(request);
    
    // Determine leaderboard key
    let leaderboardKey = 'global';
    
    if (type === 'local' && league) {
      leaderboardKey = league;
    } else if (type === 'course') {
      leaderboardKey = 'course';
    }
    
    // Get top 100 from Redis
    const leaderboardData = await getLeaderboard(leaderboardKey, 0, 99);
    
    // Parse Redis response (array of [userId, score])
    const userIds: string[] = [];
    const scores: Record<string, number> = {};
    
    for (let i = 0; i < leaderboardData.length; i += 2) {
      const id = leaderboardData[i];
      const score = parseInt(leaderboardData[i + 1] || '0');
      userIds.push(id);
      scores[id] = score;
    }
    
    // Fetch user details from database
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        points: true,
        localLeague: true,
        localSubLeague: true,
        problemsSolved: true,
      },
    });
    
    // Create user map
    const userMap = new Map(users.map(u => [u.id, u]));
    
    // Build leaderboard with rank
    const leaderboard = userIds.map((id, index) => {
      const user = userMap.get(id);
      if (!user) return null;
      
      return {
        rank: index + 1,
        userId: user.id,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        points: scores[id] || user.points,
        league: user.localLeague,
        subLeague: user.localSubLeague,
        problemsSolved: user.problemsSolved,
      };
    }).filter(Boolean);
    
    // Get current user's rank and position if authenticated
    let userPosition = null;
    if (userId) {
      const rank = await getUserRank(userId, leaderboardKey);
      
      if (rank !== null) {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
            points: true,
            localLeague: true,
            localSubLeague: true,
            problemsSolved: true,
          },
        });
        
        if (user) {
          userPosition = {
            rank: rank + 1,
            userId: user.id,
            username: user.username,
            name: user.name,
            avatar: user.avatar,
            points: user.points,
            league: user.localLeague,
            subLeague: user.localSubLeague,
            problemsSolved: user.problemsSolved,
          };
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      type,
      league: league || 'all',
      leaderboard,
      userPosition,
      total: leaderboard.length,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
