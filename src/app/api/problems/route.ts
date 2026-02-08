import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getUserFromRequest } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;
    
    // Filters
    const difficulty = searchParams.get('difficulty');
    const category = searchParams.get('category');
    const topic = searchParams.get('topic');
    const search = searchParams.get('search');
    
    // Build where clause
    const where: Record<string, unknown> = {};
    
    if (difficulty) {
      where.difficulty = difficulty;
    }
    
    if (category) {
      where.category = category;
    }
    
    if (topic) {
      where.topic = topic;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    // Get user ID if authenticated
    const userId = await getUserFromRequest(request);
    
    // Fetch problems
    const [problems, total] = await Promise.all([
      prisma.problem.findMany({
        where,
        select: {
          id: true,
          title: true,
          slug: true,
          difficulty: true,
          category: true,
          topic: true,
          tags: true,
          companies: true,
          solvedCount: true,
          attempts: true,
          successRate: true,
          submissions: userId ? {
            where: {
              userId,
              passed: true,
            },
            take: 1,
            select: {
              id: true,
              passed: true,
            },
          } : false,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.problem.count({ where }),
    ]);
    
    // Add solved status if user is authenticated
    const problemsWithStatus = problems.map((problem) => ({
      ...problem,
      isSolved: userId && problem.submissions && problem.submissions.length > 0,
      submissions: undefined, // Remove submissions from response
    }));
    
    return NextResponse.json({
      success: true,
      problems: problemsWithStatus,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Problems list error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
