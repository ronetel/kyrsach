import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shered/constants/auth-options';
import { prisma } from '@/prisma/prisma-client';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Необходима авторизация' },
        { status: 401 }
      );
    }

    let orders;
    if (session.user.role === 'Admin') {
      orders = await prisma.orders.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              Name_user: true,
              Email_user: true,
            },
          },
        },
      });
    } else {
      orders = await prisma.orders.findMany({
        where: {
          userId: Number(session.user.id),
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              Name_user: true,
              Email_user: true,
            },
          },
        },
      });
    }

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      date: new Date(order.createdAt).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      address: order.address,
      items:
        typeof order.items === 'string' ? JSON.parse(order.items) : order.items,
      total: order.totalAmount,
      status: order.status,
      points: order.points,
      user: order.user,
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error('[ORDERS_GET] Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
