import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const difficulty = searchParams.get('difficulty');
    const topic = searchParams.get('topic');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (difficulty) where.difficulty = difficulty;
    if (topic) where.topic = topic;
    if (category) where.category = category;

    // Fetch problems
    const [problems, total] = await Promise.all([
      prisma.problem.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          difficulty: true,
          topic: true,
          category: true,
          points: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.problem.count({ where }),
    ]);

    return NextResponse.json({
      problems,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching problems:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Add authentication check here
    // Only admins should be able to create problems

    const problem = await prisma.problem.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        difficulty: body.difficulty,
        topic: body.topic,
        category: body.category,
        points: body.points || 10,
        templatePython: body.templatePython,
        templateJava: body.templateJava,
        templateCpp: body.templateCpp,
        templateC: body.templateC,
        templateJavascript: body.templateJavascript,
        templateGo: body.templateGo,
        minSolveTime: body.minSolveTime || 60,
      },
    });

    // Create test cases
    if (body.testCases && body.testCases.length > 0) {
      await prisma.testCase.createMany({
        data: body.testCases.map((tc: any) => ({
          problemId: problem.id,
          input: tc.input,
          output: tc.output,
          isHidden: tc.isHidden || false,
        })),
      });
    }

    return NextResponse.json(
      {
        message: 'Problem created successfully',
        problem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating problem:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
