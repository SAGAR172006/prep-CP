import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, createUnauthorizedResponse } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const userId = await getUserFromRequest(request);
    if (!userId) {
      return createUnauthorizedResponse();
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: Record<string, unknown> = { userId };
    
    if (unreadOnly) {
      where.read = false;
    }
    
    // Fetch notifications
    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        select: {
          id: true,
          type: true,
          title: true,
          message: true,
          actionUrl: true,
          metadata: true,
          read: true,
          createdAt: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({
        where: {
          userId,
          read: false,
        },
      }),
    ]);
    
    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Notifications fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

const markAsReadSchema = z.object({
  notificationIds: z.array(z.string()).min(1, 'At least one notification ID is required'),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const userId = await getUserFromRequest(request);
    if (!userId) {
      return createUnauthorizedResponse();
    }
    
    const body = await request.json();
    
    // Validate input
    const validationResult = markAsReadSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.errors },
        { status: 400 }
      );
    }
    
    const { notificationIds } = validationResult.data;
    
    // Mark notifications as read
    const result = await prisma.notification.updateMany({
      where: {
        id: {
          in: notificationIds,
        },
        userId, // Ensure user can only mark their own notifications
      },
      data: {
        read: true,
      },
    });
    
    return NextResponse.json({
      success: true,
      message: `${result.count} notification(s) marked as read`,
      count: result.count,
    });
  } catch (error) {
    console.error('Mark as read error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const userId = await getUserFromRequest(request);
    if (!userId) {
      return createUnauthorizedResponse();
    }
    
    const { searchParams } = new URL(request.url);
    const notificationId = searchParams.get('id');
    
    if (!notificationId) {
      return NextResponse.json(
        { error: 'Notification ID is required' },
        { status: 400 }
      );
    }
    
    // Delete notification
    const notification = await prisma.notification.deleteMany({
      where: {
        id: notificationId,
        userId, // Ensure user can only delete their own notifications
      },
    });
    
    if (notification.count === 0) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Notification deleted successfully',
    });
  } catch (error) {
    console.error('Notification delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
