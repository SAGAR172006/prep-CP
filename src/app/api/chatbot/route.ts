import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, createUnauthorizedResponse } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { chatbotSchema } from '@/lib/utils/validation';
import { callChatbot } from '@/lib/ai/chatbot';
import { rateLimit } from '@/lib/db/redis';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const userId = await getUserFromRequest(request);
    if (!userId) {
      return createUnauthorizedResponse();
    }
    
    // Get user's daily bot query count
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        dailyBotQueries: true,
        isPro: true,
      },
    });
    
    if (!user) {
      return createUnauthorizedResponse();
    }
    
    // Check daily limit (20 for free, unlimited for pro)
    const dailyLimit = user.isPro ? 1000 : 20;
    const rateLimitResult = await rateLimit(
      `chatbot:${userId}:${new Date().toDateString()}`,
      dailyLimit,
      86400 // 24 hours
    );
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Daily chatbot query limit reached',
          limit: dailyLimit,
          remaining: rateLimitResult.remaining,
          resetIn: rateLimitResult.reset,
        },
        { status: 429 }
      );
    }
    
    const body = await request.json();
    
    // Validate input
    const validationResult = chatbotSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.errors },
        { status: 400 }
      );
    }
    
    const { action, problemDescription, userCode } = validationResult.data;
    
    // Validate action-specific requirements
    if (action === 'debug' && !userCode) {
      return NextResponse.json(
        { error: 'User code is required for debug action' },
        { status: 400 }
      );
    }
    
    // Call AI chatbot
    const response = await callChatbot(action, problemDescription, userCode);
    
    // Track analytics
    await prisma.analytics.create({
      data: {
        userId,
        eventType: 'chatbot_query',
        eventData: {
          action,
          hasCode: !!userCode,
        },
      },
    });
    
    return NextResponse.json({
      success: true,
      response,
      action,
      remaining: rateLimitResult.remaining,
      limit: dailyLimit,
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
