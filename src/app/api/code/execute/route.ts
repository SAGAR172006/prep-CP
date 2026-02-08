import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, createUnauthorizedResponse } from '@/lib/auth/session';
import { codeExecutionSchema } from '@/lib/utils/validation';
import { executeCode } from '@/lib/code-execution/executor';
import { rateLimit } from '@/lib/db/redis';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const userId = await getUserFromRequest(request);
    if (!userId) {
      return createUnauthorizedResponse();
    }
    
    // Rate limiting
    const rateLimitResult = await rateLimit(`code-execute:${userId}`, 30, 60);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded', 
          remaining: rateLimitResult.remaining,
          resetIn: rateLimitResult.reset 
        },
        { status: 429 }
      );
    }
    
    const body = await request.json();
    
    // Validate input
    const validationResult = codeExecutionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.errors },
        { status: 400 }
      );
    }
    
    const { code, language, testCases } = validationResult.data;
    
    // Execute code against test cases or single run
    if (testCases && testCases.length > 0) {
      const results = [];
      
      for (const testCase of testCases.slice(0, 5)) { // Limit to 5 test cases for execution
        const result = await executeCode(code, language, testCase.input);
        results.push({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: result.output || '',
          passed: result.success && 
                  result.output?.trim() === testCase.expectedOutput.trim(),
          executionTime: result.executionTime,
          memory: result.memory,
          error: result.error,
        });
      }
      
      const passedCount = results.filter(r => r.passed).length;
      
      return NextResponse.json({
        success: true,
        results,
        summary: {
          total: results.length,
          passed: passedCount,
          failed: results.length - passedCount,
          allPassed: passedCount === results.length,
        },
      });
    } else {
      // Single execution without test cases
      const result = await executeCode(code, language, '');
      
      return NextResponse.json({
        success: result.success,
        output: result.output,
        error: result.error,
        executionTime: result.executionTime,
        memory: result.memory,
      });
    }
  } catch (error) {
    console.error('Code execution error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
