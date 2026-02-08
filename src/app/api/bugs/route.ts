import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, createUnauthorizedResponse } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { bugReportSchema } from '@/lib/utils/validation';
import { analyzeBugReport } from '@/lib/ai/chatbot';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const userId = await getUserFromRequest(request);
    if (!userId) {
      return createUnauthorizedResponse();
    }
    
    const body = await request.json();
    
    // Validate input
    const validationResult = bugReportSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.errors },
        { status: 400 }
      );
    }
    
    const { problemId, type, title, description, stepsToReproduce, code, screenshots } = validationResult.data;
    
    // Validate problem if provided
    if (problemId) {
      const problem = await prisma.problem.findUnique({
        where: { id: problemId },
        select: { id: true },
      });
      
      if (!problem) {
        return NextResponse.json(
          { error: 'Problem not found' },
          { status: 404 }
        );
      }
    }
    
    // Use AI to analyze bug report
    const analysis = await analyzeBugReport(description);
    
    // Create bug report
    const bug = await prisma.bug.create({
      data: {
        userId,
        problemId,
        type: analysis.category || type,
        title,
        description,
        stepsToReproduce,
        code,
        screenshots: screenshots || [],
        status: 'submitted',
      },
      select: {
        id: true,
        type: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
      },
    });
    
    // Create notification for user
    await prisma.notification.create({
      data: {
        userId,
        type: 'bug_update',
        title: 'Bug Report Submitted',
        message: `Your bug report "${title}" has been submitted and will be reviewed soon.`,
        actionUrl: `/bugs/${bug.id}`,
      },
    });
    
    // Track analytics
    await prisma.analytics.create({
      data: {
        userId,
        eventType: 'bug_report',
        eventData: {
          bugId: bug.id,
          category: analysis.category,
          severity: analysis.severity,
        },
      },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Bug report submitted successfully',
      bug,
      analysis: {
        category: analysis.category,
        severity: analysis.severity,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Bug report error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const userId = await getUserFromRequest(request);
    if (!userId) {
      return createUnauthorizedResponse();
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: Record<string, unknown> = { userId };
    
    if (status) {
      where.status = status;
    }
    
    // Fetch user's bug reports
    const [bugs, total] = await Promise.all([
      prisma.bug.findMany({
        where,
        select: {
          id: true,
          problemId: true,
          type: true,
          title: true,
          description: true,
          status: true,
          pointsAwarded: true,
          createdAt: true,
          updatedAt: true,
          resolvedAt: true,
          problem: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.bug.count({ where }),
    ]);
    
    return NextResponse.json({
      success: true,
      bugs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Bug list error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
