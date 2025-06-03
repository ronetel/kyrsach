import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shered/constants/auth-options';
import { prisma } from '@/prisma/prisma-client';
import { createOrder, createOrderForMobile } from '@/app/actions';
import { verifyToken } from '@/shered/lib/verify-token';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');

    if (authHeader) {
      const decoded = verifyToken(request);
      if (!decoded) {
        return NextResponse.json(
          { message: 'Необходима авторизация' },
          { status: 401 }
        );
      }

      const userId = Number(decoded.id);

      let orders;

      orders = await prisma.orders.findMany({
        where: {
          userId: userId,
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

      const formattedOrders = await Promise.all(
        orders.map(async (order) => {
          let items =
            typeof order.items === 'string'
              ? JSON.parse(order.items)
              : order.items;

          items = await Promise.all(
            items.map(async (item: any) => {
              const productItem = await prisma.productItems.findUnique({
                where: { Id: item.productItemId },
                include: {
                  Product: true,
                },
              });
              return {
                id: item.id,
                cartId: item.cartId,
                productItemId: item.productItemId,
                quantity: item.quantity,
                name: productItem?.Product?.name || 'Unknown Product',
              };
            })
          );

          return {
            id: order.id,
            date: order.createdAt,
            address: order.address,
            items,
            total: order.totalAmount,
            status: order.status,
            points: order.points,
            user: order.user,
          };
        })
      );

      return NextResponse.json(formattedOrders);
    } else {
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

      const formattedOrders = await Promise.all(
        orders.map(async (order) => {
          let items =
            typeof order.items === 'string'
              ? JSON.parse(order.items)
              : order.items;

          items = await Promise.all(
            items.map(async (item: any) => {
              const productItem = await prisma.productItems.findUnique({
                where: { Id: item.productItemId },
                include: {
                  Product: true,
                },
              });
              return {
                ...item,
                productItem: productItem
                  ? {
                      ...productItem,
                      Product: productItem.Product,
                    }
                  : null,
              };
            })
          );

          return {
            id: order.id,
            date: new Date(order.createdAt).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            address: order.address,
            fullname: order.fullName,
            email: order.email,
            items,
            total: order.totalAmount,
            status: order.status,
            points: order.points,
            user: order.user,
          };
        })
      );

      return NextResponse.json(formattedOrders);
    }
  } catch (error) {
    console.error('[ORDERS_GET] Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      const decoded = verifyToken(request);
      if (!decoded) {
        return NextResponse.json(
          { error: 'Необходима авторизация' },
          { status: 401 }
        );
      }

      const body = await request.json();
      const {
        form,
        totalPrice,
        loyaltyPoints,
        usePoints,
        pointsToDeduct,
        cart,
      } = body;

      const result = await createOrderForMobile(
        decoded,
        form,
        loyaltyPoints,
        totalPrice,
        usePoints,
        pointsToDeduct,
        cart
      );

      return NextResponse.json({ success: true, redirect: result });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Необходима авторизация' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { form, totalPrice, loyaltyPoints, usePoints, pointsToDeduct } = body;

    const result = await createOrder(
      form,
      loyaltyPoints,
      totalPrice,
      usePoints,
      pointsToDeduct
    );

    return NextResponse.json({ success: true, redirect: result });
  } catch (error) {
    console.error('[ORDERS_POST] Ошибка:', error);
    return NextResponse.json(
      { error: 'Не удалось создать заказ' },
      { status: 500 }
    );
  }
}
