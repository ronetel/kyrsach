import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shered/constants/auth-options';
import { prisma } from '@/prisma/prisma-client';

export async function PATCH(
  request: Request,
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
    const params = await context.params;
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['PENDING', 'SUCCEEDED', 'CANCELLED'].includes(status)) {
      return NextResponse.json(
        { error: 'Неверный статус заказа.' },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.orders.update({
      where: { id: Number(id) },
      data: { status },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error(
      '[ADMIN_ORDERS_STATUS_PATCH] Ошибка в',
      new Date().toISOString(),
      error
    );
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
