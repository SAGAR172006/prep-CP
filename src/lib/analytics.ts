/**
 * Monitoring and Analytics Setup
 * Using free tiers of Sentry and PostHog
 */

/**
 * Sentry Configuration - Error Monitoring
 * FREE TIER: 5,000 events/month
 */
export function initSentry() {
  if (typeof window === 'undefined') return

  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN
  if (!dsn) {
    console.warn('Sentry DSN not configured')
    return
  }

  // Sentry will be initialized via next.config.js integration
  console.log('Sentry initialized')
}

/**
 * PostHog Configuration - Product Analytics
 * FREE TIER: 1M events/month
 */
export function initPostHog() {
  if (typeof window === 'undefined') return

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

  if (!posthogKey) {
    console.warn('PostHog not configured')
    return
  }

  // PostHog initialization
  const posthog = require('posthog-js')
  posthog.init(posthogKey, {
    api_host: posthogHost || 'https://app.posthog.com',
    loaded: () => {
      console.log('PostHog initialized')
    },
  })

  return posthog
}

/**
 * Track custom events
 */
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined') return

  try {
    const posthog = require('posthog-js')
    if (posthog?.capture) {
      posthog.capture(eventName, properties)
    }
  } catch (error) {
    console.error('Event tracking error:', error)
  }
}

/**
 * Track user identification
 */
export function identifyUser(userId: string, traits?: Record<string, any>) {
  if (typeof window === 'undefined') return

  try {
    const posthog = require('posthog-js')
    if (posthog?.identify) {
      posthog.identify(userId, traits)
    }
  } catch (error) {
    console.error('User identification error:', error)
  }
}

/**
 * Track page views
 */
export function trackPageView(url: string) {
  if (typeof window === 'undefined') return

  try {
    const posthog = require('posthog-js')
    if (posthog?.capture) {
      posthog.capture('$pageview', { url })
    }
  } catch (error) {
    console.error('Page view tracking error:', error)
  }
}

/**
 * Common event types for the platform
 */
export const EVENTS = {
  // User actions
  USER_SIGNUP: 'user_signup',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  
  // Problem solving
  PROBLEM_VIEWED: 'problem_viewed',
  CODE_SUBMITTED: 'code_submitted',
  PROBLEM_SOLVED: 'problem_solved',
  TEST_CASE_RUN: 'test_case_run',
  
  // AI features
  AI_CHAT_STARTED: 'ai_chat_started',
  AI_CODE_DEBUG: 'ai_code_debug',
  AI_CODE_EXPLAIN: 'ai_code_explain',
  PROBLEM_GENERATED: 'problem_generated',
  
  // Social features
  FRIEND_REQUEST_SENT: 'friend_request_sent',
  FRIEND_REQUEST_ACCEPTED: 'friend_request_accepted',
  CHALLENGE_CREATED: 'challenge_created',
  
  // Gamification
  STREAK_UPDATED: 'streak_updated',
  LEAGUE_CHANGED: 'league_changed',
  BADGE_EARNED: 'badge_earned',
  
  // Subscription
  PRO_UPGRADE_STARTED: 'pro_upgrade_started',
  PRO_UPGRADE_COMPLETED: 'pro_upgrade_completed',
  PAYMENT_FAILED: 'payment_failed',
}
