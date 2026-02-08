import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getUserFromRequest } from '@/lib/auth/session';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const userId = await getUserFromRequest(request);
    
    // Fetch problem
    const problem = await prisma.problem.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        difficulty: true,
        category: true,
        topic: true,
        subtopic: true,
        constraints: true,
        examples: true,
        hints: true,
        codeTemplates: true,
        testCases: true,
        tags: true,
        companies: true,
        minSolveTime: true,
        avgSolveTime: true,
        successRate: true,
        attempts: true,
        solvedCount: true,
      },
    });
    
    if (!problem) {
      return NextResponse.json(
        { error: 'Problem not found' },
        { status: 404 }
      );
    }
    
    // Filter out hidden test cases
    const testCases = Array.isArray(problem.testCases) 
      ? problem.testCases.filter((tc: { isHidden?: boolean }) => !tc.isHidden)
      : [];
    
    // Get user's submissions if authenticated
    let userSubmissions = [];
    if (userId) {
      userSubmissions = await prisma.submission.findMany({
        where: {
          userId,
          problemId: id,
        },
        select: {
          id: true,
          status: true,
          passed: true,
          language: true,
          testsPassed: true,
          testsTotal: true,
          executionTime: true,
          memoryUsed: true,
          attemptNumber: true,
          pointsEarned: true,
          submittedAt: true,
        },
        orderBy: {
          submittedAt: 'desc',
        },
        take: 10,
      });
    }
    
    return NextResponse.json({
      success: true,
      problem: {
        ...problem,
        testCases,
      },
      userSubmissions,
      isSolved: userSubmissions.some((s) => s.passed),
      bestSubmission: userSubmissions.find((s) => s.passed),
    });
  } catch (error) {
    console.error('Problem fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
