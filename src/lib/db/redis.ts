import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limiting helper
export async function rateLimit(identifier: string, limit: number, window: number) {
  const key = `rate-limit:${identifier}`;
  const current = await redis.incr(key);
  
  if (current === 1) {
    await redis.expire(key, window);
  }
  
  return {
    success: current <= limit,
    remaining: Math.max(0, limit - current),
    reset: window,
  };
}

// Leaderboard helpers
export async function updateLeaderboard(userId: string, points: number, league: string) {
  const key = `leaderboard:${league}`;
  await redis.zadd(key, { score: points, member: userId });
}

export async function getLeaderboard(league: string, start = 0, end = 99) {
  const key = `leaderboard:${league}`;
  return await redis.zrange(key, start, end, { rev: true, withScores: true });
}

export async function getUserRank(userId: string, league: string) {
  const key = `leaderboard:${league}`;
  return await redis.zrevrank(key, userId);
}
