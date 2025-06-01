import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.users.findFirst({
      where: {
        Email_user: email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }

    const isPasswordValid = await compare(password, user.Password_user);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!user.verified) {
      return NextResponse.json(
        { message: 'User not verified' },
        { status: 403 }
      );
    }

    const token = jwt.sign(
      { id: user.ID_User, email: user.Email_user },
      process.env.JWT_SECRET || ''
    );

    return NextResponse.json(
      {
        accessToken: token,
        user: {
          id: user.ID_User,
          email: user.Email_user,
          name: user.Name_user,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
