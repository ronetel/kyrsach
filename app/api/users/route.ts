import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shered/constants/auth-options';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== 'Admin') {
      return NextResponse.json(
        { error: 'Доступ запрещён. Требуются права администратора.' },
        { status: 403 }
      );
    }

    const users = await prisma.users.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error('[USERS_GET] Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== 'Admin') {
      return NextResponse.json(
        { error: 'Доступ запрещён. Требуются права администратора.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { Phone, Password_user, Name_user, Email_user, role } = body;

    if (!Name_user || !Email_user || !Password_user || !role) {
      return NextResponse.json(
        { error: 'Необходимо указать имя, email, пароль и роль.' },
        { status: 400 }
      );
    }

    const newUser = await prisma.users.create({
      data: {
        Phone,
        Password_user,
        Name_user,
        Email_user,
        role,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('[USERS_POST] Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
