import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, createUnauthorizedResponse } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { verifyTestCases } from '@/lib/code-execution/executor';
import { calculatePoints, calculateLeague } from '@/lib/utils/helpers';
import { rateLimit, updateLeaderboard } from '@/lib/db/redis';
import { z } from 'zod';

const verifySchema = z.object({
  code: z.string().min(1, 'Code is required'),
  language: z.string().min(1, 'Language is required'),
  problemId: z.string().min(1, 'Problem ID is required'),
  timeSpent: z.number().min(0).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const userId = await getUserFromRequest(request);
    if (!userId) {
      return createUnauthorizedResponse();
    }
    
    // Rate limiting
    const rateLimitResult = await rateLimit(`code-verify:${userId}`, 10, 60);
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
    const validationResult = verifySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.errors },
        { status: 400 }
      );
    }
    
    const { code, language, problemId, timeSpent = 0 } = validationResult.data;
    
    // Fetch problem with all test cases (including hidden ones)
    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
      select: {
        id: true,
        title: true,
        difficulty: true,
        testCases: true,
        minSolveTime: true,
      },
    });
    
    if (!problem) {
      return NextResponse.json(
        { error: 'Problem not found' },
        { status: 404 }
      );
    }
    
    // Get user's previous attempts
    const previousAttempts = await prisma.submission.count({
      where: {
        userId,
        problemId,
      },
    });
    
    const attemptNumber = previousAttempts + 1;
    
    // Verify code against all test cases
    const testCases = Array.isArray(problem.testCases) 
      ? problem.testCases.map((tc: unknown) => {
          const testCase = tc as { input: string; expectedOutput: string };
          return {
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
          };
        })
      : [];
    
    const verification = await verifyTestCases(code, language, testCases);
    
    // Anti-cheat: Check if solved too quickly
    const isFlaggedFast = timeSpent > 0 && timeSpent < problem.minSolveTime / 2;
    
    // Calculate status
    let status = 'Wrong Answer';
    if (verification.passed) {
      status = 'Accepted';
    } else if (verification.results.some(r => r.error)) {
      status = 'Runtime Error';
    }
    
    // Calculate points if passed
    let pointsEarned = 0;
    let basePoints = 0;
    
    if (verification.passed) {
      // Base points by difficulty
      const difficultyPoints: Record<string, number> = {
        Easy: 10,
        Medium: 20,
        Hard: 30,
      };
      
      basePoints = difficultyPoints[problem.difficulty] || 10;
      pointsEarned = calculatePoints(basePoints, attemptNumber, isFlaggedFast);
    }
    
    // Get avg execution time and memory
    const avgExecutionTime = verification.results.reduce((sum, r) => {
      const result = r as { executionTime?: number };
      return sum + (result.executionTime || 0);
    }, 0) / verification.results.length;
    const avgMemory = verification.results.reduce((sum, r) => {
      const result = r as { memory?: number };
      return sum + (result.memory || 0);
    }, 0) / verification.results.length;
    
    // Create submission record
    const submission = await prisma.submission.create({
      data: {
        userId,
        problemId,
        code,
        language,
        status,
        passed: verification.passed,
        testsPassed: verification.passedTests,
        testsTotal: verification.totalTests,
        executionTime: Math.round(avgExecutionTime),
        memoryUsed: Math.round(avgMemory),
        timeSpent,
        attemptNumber,
        pointsEarned,
        isFlaggedFast,
      },
    });
    
    // Update user stats if passed
    if (verification.passed) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          points: true,
          problemsSolved: true,
          submissions: {
            where: {
              passed: true,
              problemId,
            },
            take: 1,
          },
        },
      });
      
      const isFirstSolve = !user?.submissions || user.submissions.length === 0;
      
      if (isFirstSolve) {
        // Update user points and stats
        const newPoints = (user?.points || 0) + pointsEarned;
        const league = calculateLeague(newPoints);
        
        await prisma.user.update({
          where: { id: userId },
          data: {
            points: newPoints,
            problemsSolved: (user?.problemsSolved || 0) + 1,
            localLeague: league.league,
            localSubLeague: league.subLeague,
          },
        });
        
        // Update leaderboard
        await updateLeaderboard(userId, newPoints, league.league);
        
        // Update problem stats
        await prisma.problem.update({
          where: { id: problemId },
          data: {
            solvedCount: { increment: 1 },
            attempts: { increment: 1 },
          },
        });
      } else {
        // Just increment attempts
        await prisma.problem.update({
          where: { id: problemId },
          data: {
            attempts: { increment: 1 },
          },
        });
      }
    } else {
      // Increment attempts for failed submission
      await prisma.problem.update({
        where: { id: problemId },
        data: {
          attempts: { increment: 1 },
        },
      });
    }
    
    return NextResponse.json({
      success: true,
      submission: {
        id: submission.id,
        status: submission.status,
        passed: submission.passed,
        testsPassed: submission.testsPassed,
        testsTotal: submission.testsTotal,
        executionTime: submission.executionTime,
        memoryUsed: submission.memoryUsed,
        pointsEarned: submission.pointsEarned,
        attemptNumber: submission.attemptNumber,
        isFlaggedFast: submission.isFlaggedFast,
      },
      results: verification.results.slice(0, 3), // Return first 3 test cases results
      totalTests: verification.totalTests,
    });
  } catch (error) {
    console.error('Code verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
