import { NextRequest, NextResponse } from 'next/server'
import { chat, chatbotAction, generateProblem } from '@/lib/ai'
import { getCachedAIResponse, cacheAIResponse } from '@/lib/redis'
import { hashCode } from '@/utils/helpers'

/**
 * AI Chat API
 * Supports 4 pre-defined actions: explain, debug, optimize, generate
 * Uses free AI services with automatic fallback
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, code, messages } = body

    // Validate input
    if (!action && !messages) {
      return NextResponse.json(
        { error: 'Either action or messages must be provided' },
        { status: 400 }
      )
    }

    // Generate cache key
    const cacheKey = action
      ? `ai:${action}:${hashCode(code || '')}`
      : `ai:chat:${hashCode(JSON.stringify(messages))}`

    // Check cache first
    const cached = await getCachedAIResponse(cacheKey)
    if (cached) {
      return NextResponse.json({
        content: cached,
        provider: 'cache',
        cached: true,
      })
    }

    // Call AI service
    let response
    if (action) {
      // Pre-defined action
      if (!['explain', 'debug', 'optimize', 'generate'].includes(action)) {
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
      }
      response = await chatbotAction(action, code)
    } else {
      // Custom chat
      response = await chat(messages)
    }

    // Cache response for 24 hours
    await cacheAIResponse(cacheKey, response.content, 86400)

    return NextResponse.json(response)
  } catch (error) {
    console.error('AI API error:', error)
    return NextResponse.json(
      { error: 'AI service failed. Please try again.' },
      { status: 500 }
    )
  }
}

/**
 * Generate coding problem with AI
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const difficulty = searchParams.get('difficulty') as 'easy' | 'medium' | 'hard'

    if (!difficulty || !['easy', 'medium', 'hard'].includes(difficulty)) {
      return NextResponse.json(
        { error: 'Invalid difficulty. Must be easy, medium, or hard.' },
        { status: 400 }
      )
    }

    // Check cache
    const cacheKey = `ai:problem:${difficulty}`
    const cached = await getCachedAIResponse(cacheKey)
    if (cached) {
      return NextResponse.json({
        content: cached,
        provider: 'cache',
        cached: true,
      })
    }

    // Generate problem
    const response = await generateProblem(difficulty)

    // Cache for 1 hour (problems should be somewhat unique)
    await cacheAIResponse(cacheKey, response.content, 3600)

    return NextResponse.json(response)
  } catch (error) {
    console.error('Problem generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate problem. Please try again.' },
      { status: 500 }
    )
  }
}
