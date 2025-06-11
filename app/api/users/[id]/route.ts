import { prisma } from '@/prisma/prisma-client';
import { authOptions } from '@/shered/constants/auth-options';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== 'Admin') {
      return NextResponse.json(
        { error: 'Доступ запрещён. Требуются права администратора.' },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const userId = Number(id);

    if (!id) {
      return NextResponse.json(
        { error: 'ID пользователя обязателен' },
        { status: 400 }
      );
    }

    await prisma.users.delete({
      where: { ID_User: userId },
    });

    return NextResponse.json({ message: 'Пользователь удалён' });
  } catch (error) {
    console.error('[USERS_DELETE] Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== 'Admin') {
      return NextResponse.json(
        { error: 'Доступ запрещён. Требуются права администратора.' },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const userId = Number(id);
    const body = await request.json();
    const { Phone, Password_user, Name_user, Email_user, role, verified } =
      body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID пользователя обязателен' },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.users.update({
      where: { ID_User: userId },
      data: {
        Phone,
        Password_user,
        Name_user,
        Email_user,
        role,
        verified: verified ? new Date(verified) : undefined,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('[USERS_PATCH] Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
