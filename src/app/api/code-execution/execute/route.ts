import { NextRequest, NextResponse } from 'next/server'
import { executeCode, runTestCases, validateCode } from '@/lib/piston'
import { checkRateLimit } from '@/lib/redis'

/**
 * Code Execution API
 * Uses free Piston API for code execution
 * Supports 50+ programming languages
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { language, code, testCases, stdin } = body

    // Validate input
    if (!language || !code) {
      return NextResponse.json(
        { error: 'Language and code are required' },
        { status: 400 }
      )
    }

    // Rate limiting (20 executions per hour per IP)
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitKey = `execute:${ip}`
    const rateLimit = await checkRateLimit(rateLimitKey, 20, 3600)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    // Validate code
    const validation = validateCode(code, language)
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Code validation failed', errors: validation.errors },
        { status: 400 }
      )
    }

    // Execute code
    if (testCases && Array.isArray(testCases)) {
      // Run with test cases
      const results = await runTestCases(language, code, testCases)
      return NextResponse.json({
        ...results,
        remainingExecutions: rateLimit.remaining,
      })
    } else {
      // Simple execution
      const result = await executeCode({
        language,
        code,
        stdin,
      })
      return NextResponse.json({
        ...result,
        remainingExecutions: rateLimit.remaining,
      })
    }
  } catch (error) {
    console.error('Code execution error:', error)
    return NextResponse.json(
      { error: 'Code execution failed. Please try again.' },
      { status: 500 }
    )
  }
}

/**
 * Get available languages
 */
export async function GET() {
  try {
    const { getAvailableLanguages } = await import('@/lib/piston')
    const languages = await getAvailableLanguages()
    return NextResponse.json({ languages })
  } catch (error) {
    console.error('Error fetching languages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch languages' },
      { status: 500 }
    )
  }
}
