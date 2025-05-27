import { prisma } from '@/prisma/prisma-client';
import { authOptions } from '@/shered/constants/auth-options';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: 'Вы не авторизованы' }, 
        { status: 401 }
      );
    }

    const data = await prisma.users.findUnique({
      where: {
        ID_User: Number(session.user.id),
      },
      select: {
        Name_user: true,
        Email_user: true,
        Password_user: false,
        Points: true,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('[USER_GET] Server error:', error);
    return NextResponse.json(
      { message: 'Ошибка сервера' }, 
      { status: 500 }
    );
  }
}