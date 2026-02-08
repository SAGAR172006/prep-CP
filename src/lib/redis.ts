/**
 * Upstash Redis Client Configuration
 * FREE TIER: 10,000 commands/day
 * Perfect for caching, rate limiting, and session storage
 */

import { Redis } from '@upstash/redis'

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null

if (!redis) {
  console.warn('Redis not configured. Caching will be disabled.')
}

/**
 * Cache AI responses to reduce API calls
 */
export async function cacheAIResponse(key: string, value: string, expirationSeconds = 3600) {
  if (!redis) return false
  try {
    await redis.set(key, value, { ex: expirationSeconds })
    return true
  } catch (error) {
    console.error('Redis cache error:', error)
    return false
  }
}

/**
 * Get cached AI response
 */
export async function getCachedAIResponse(key: string): Promise<string | null> {
  if (!redis) return null
  try {
    return await redis.get<string>(key)
  } catch (error) {
    console.error('Redis get error:', error)
    return null
  }
}

/**
 * Rate limiting using Redis
 */
export async function checkRateLimit(
  identifier: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number }> {
  if (!redis) {
    return { allowed: true, remaining: limit }
  }

  const key = `ratelimit:${identifier}`
  
  try {
    const current = await redis.incr(key)
    
    if (current === 1) {
      await redis.expire(key, windowSeconds)
    }

    const allowed = current <= limit
    const remaining = Math.max(0, limit - current)

    return { allowed, remaining }
  } catch (error) {
    console.error('Rate limit check error:', error)
    return { allowed: true, remaining: limit }
  }
}

/**
 * Cache problem data
 */
export async function cacheProblem(problemId: string, problemData: any) {
  if (!redis) return false
  try {
    await redis.set(`problem:${problemId}`, JSON.stringify(problemData), { ex: 86400 }) // 24 hours
    return true
  } catch (error) {
    console.error('Problem cache error:', error)
    return false
  }
}

/**
 * Get cached problem
 */
export async function getCachedProblem(problemId: string): Promise<any | null> {
  if (!redis) return null
  try {
    const data = await redis.get<string>(`problem:${problemId}`)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Problem get error:', error)
    return null
  }
}

/**
 * Cache user session
 */
export async function cacheUserSession(userId: string, sessionData: any, expirationSeconds = 3600) {
  if (!redis) return false
  try {
    await redis.set(`session:${userId}`, JSON.stringify(sessionData), { ex: expirationSeconds })
    return true
  } catch (error) {
    console.error('Session cache error:', error)
    return false
  }
}

/**
 * Get cached user session
 */
export async function getCachedUserSession(userId: string): Promise<any | null> {
  if (!redis) return null
  try {
    const data = await redis.get<string>(`session:${userId}`)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Session get error:', error)
    return null
  }
}

/**
 * Increment counter (for analytics, streaks, etc.)
 */
export async function incrementCounter(key: string, expirationSeconds?: number): Promise<number> {
  if (!redis) return 0
  try {
    const count = await redis.incr(key)
    if (expirationSeconds && count === 1) {
      await redis.expire(key, expirationSeconds)
    }
    return count
  } catch (error) {
    console.error('Counter increment error:', error)
    return 0
  }
}

/**
 * Clear cache by pattern
 */
export async function clearCachePattern(pattern: string): Promise<void> {
  if (!redis) return
  try {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  } catch (error) {
    console.error('Cache clear error:', error)
  }
}

export { redis }
