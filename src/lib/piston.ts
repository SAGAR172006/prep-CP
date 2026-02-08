/**
 * Piston API Integration - Free Code Execution Engine
 * 
 * FREE OPTIONS:
 * 1. Public API: https://emkc.org/api/v2/piston (rate-limited but free)
 * 2. Self-hosted: Clone from https://github.com/engineer-man/piston
 * 
 * Supports 50+ programming languages
 */

const PISTON_API_URL = process.env.PISTON_API_URL || 'https://emkc.org/api/v2/piston'

interface ExecuteCodeRequest {
  language: string
  version?: string
  code: string
  stdin?: string
  args?: string[]
  compileTimeout?: number
  runTimeout?: number
}

interface ExecuteCodeResponse {
  language: string
  version: string
  run: {
    stdout: string
    stderr: string
    code: number
    signal: string | null
    output: string
  }
  compile?: {
    stdout: string
    stderr: string
    code: number
    output: string
  }
}

// Language version mappings for Piston
const LANGUAGE_VERSIONS: Record<string, string> = {
  python: '3.10.0',
  java: '15.0.2',
  cpp: '10.2.0',
  c: '10.2.0',
  javascript: '18.15.0',
  typescript: '5.0.3',
  go: '1.16.2',
  rust: '1.68.2',
  kotlin: '1.8.20',
  swift: '5.3.3',
}

/**
 * Get list of available languages and versions from Piston
 */
export async function getAvailableLanguages() {
  try {
    const response = await fetch(`${PISTON_API_URL}/runtimes`)
    if (!response.ok) {
      throw new Error('Failed to fetch available languages')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching languages:', error)
    return []
  }
}

/**
 * Execute code using Piston API
 */
export async function executeCode(
  request: ExecuteCodeRequest
): Promise<ExecuteCodeResponse> {
  const version = request.version || LANGUAGE_VERSIONS[request.language] || 'latest'

  try {
    const response = await fetch(`${PISTON_API_URL}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: request.language,
        version: version,
        files: [
          {
            name: `main.${getFileExtension(request.language)}`,
            content: request.code,
          },
        ],
        stdin: request.stdin || '',
        args: request.args || [],
        compile_timeout: request.compileTimeout || 10000,
        run_timeout: request.runTimeout || 3000,
      }),
    })

    if (!response.ok) {
      throw new Error(`Piston API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Code execution error:', error)
    throw error
  }
}

/**
 * Run code with test cases
 */
export async function runTestCases(
  language: string,
  code: string,
  testCases: Array<{ input: string; expectedOutput: string }>
) {
  const results = []

  for (const testCase of testCases) {
    try {
      const result = await executeCode({
        language,
        code,
        stdin: testCase.input,
      })

      const output = result.run.stdout.trim()
      const passed = output === testCase.expectedOutput.trim()

      results.push({
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: output,
        stderr: result.run.stderr,
        passed,
        executionTime: 0, // Piston doesn't provide this
      })
    } catch (error) {
      results.push({
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: '',
        stderr: error instanceof Error ? error.message : 'Unknown error',
        passed: false,
        executionTime: 0,
      })
    }
  }

  return {
    passed: results.every(r => r.passed),
    results,
    totalTests: testCases.length,
    passedTests: results.filter(r => r.passed).length,
  }
}

/**
 * Get file extension for language
 */
function getFileExtension(language: string): string {
  const extensions: Record<string, string> = {
    python: 'py',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    javascript: 'js',
    typescript: 'ts',
    go: 'go',
    rust: 'rs',
    kotlin: 'kt',
    swift: 'swift',
  }
  return extensions[language] || 'txt'
}

/**
 * Validate code before execution (basic checks)
 */
export function validateCode(code: string, language: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!code || code.trim().length === 0) {
    errors.push('Code cannot be empty')
  }

  if (code.length > 50000) {
    errors.push('Code is too long (max 50KB)')
  }

  // Language-specific basic checks
  if (language === 'python' && code.includes('import os') && code.includes('system')) {
    errors.push('System commands are not allowed')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
