import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db/prisma';
import { signupSchema } from '@/lib/utils/validation';
import { signToken } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.errors },
        { status: 400 }
      );
    }
    
    const { email, username, password, name } = validationResult.data;
    
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });
    
    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name: name || username,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        avatar: true,
        points: true,
        localLeague: true,
        localSubLeague: true,
      },
    });
    
    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      username: user.username,
    });
    
    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        user,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
