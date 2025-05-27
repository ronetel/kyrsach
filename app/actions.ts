'use server';

import { prisma } from '@/prisma/prisma-client';
import { getVerificationTemplate } from '@/shered/components/shared/email-temapltes/verification-user';
import { CheckoutFormValues } from '@/shered/constants';
import { authOptions } from '@/shered/constants/auth-options';
import { getUserSession } from '@/shered/lib/get-user-session';
import { sendVerificationEmail } from '@/shered/lib/send-email';
import { OrderStatus, Prisma } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';

export async function createOrder(
  data: CheckoutFormValues,
  loyaltyPoints: number,
  totalPrice: number,
  usePoints: boolean,
  accountPoints: number
) {
  try {
    const cookieStore = cookies();
    const cartToken = (await cookieStore).get('cartToken')?.value;
    const currentUser = await getServerSession(authOptions);

    if (!cartToken && !currentUser?.user.id) {
      throw new Error('Не найдена корзина для оформления заказа');
    }

    const userCart = await prisma.carts.findFirst({
      include: {
        user: true,
        items: {
          include: {
            productItem: {
              include: {
                Product: true,
              },
            },
          },
        },
      },
      where: {
        OR: [
          ...(cartToken ? [{ token: cartToken }] : []),
          ...(currentUser?.user.id
            ? [{ userId: Number(currentUser.user.id) }]
            : []),
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!userCart) {
      throw new Error('Корзина не найдена');
    }

    if (userCart?.totalAmount === 0 || userCart.items.length === 0) {
      throw new Error('Корзина пустая');
    }

    let finalTotalPrice = totalPrice;
    let pointsToDeduct = 0;

    if (usePoints && userCart.userId && accountPoints > 0) {
      pointsToDeduct = Math.min(accountPoints, totalPrice);
      finalTotalPrice = Math.max(totalPrice - pointsToDeduct, 0);
    }

    const order = await prisma.orders.create({
      data: {
        token: userCart.token || '',
        userId: userCart.userId || null,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: finalTotalPrice,
        status: OrderStatus.PENDING,
        points: loyaltyPoints,
        items: userCart.items,
      },
    });

    if (userCart.userId) {
      const currentPoints =
        (
          await prisma.users.findUnique({
            where: { ID_User: userCart.userId },
            select: { Points: true },
          })
        )?.Points || 0;

      const newPoints =
        currentPoints + loyaltyPoints - (usePoints ? pointsToDeduct : 0);

      await prisma.users.update({
        where: {
          ID_User: userCart.userId,
        },
        data: {
          Points: newPoints,
        },
      });
    }

    await prisma.$transaction([
      prisma.cartItems.deleteMany({
        where: {
          cartId: userCart.id,
        },
      }),
      prisma.carts.update({
        where: {
          id: userCart.id,
        },
        data: {
          totalAmount: 0,
        },
      }),
    ]);

    return '/';
  } catch (err) {
    console.error(
      '[CreateOrder] Server error at',
      new Date().toISOString(),
      err
    );
    throw err;
  }
}

export async function updateUserInfo(body: Prisma.UsersUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.users.findFirst({
      where: {
        ID_User: Number(currentUser.id),
      },
    });

    await prisma.users.update({
      where: {
        ID_User: Number(currentUser.id),
      },
      data: {
        Name_user: body.Name_user,
        Email_user: body.Email_user,
        Password_user: body.Password_user
          ? hashSync(body.Password_user as string, 10)
          : findUser?.Password_user,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}

export async function registerUser(body: Prisma.UsersCreateInput) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        Email_user: body.Email_user,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.users.create({
      data: {
        Name_user: body.Name_user,
        Email_user: body.Email_user,
        Password_user: hashSync(body.Password_user, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.ID_User,
      },
    });

    await sendVerificationEmail(
      createdUser.Email_user,
      'Next Pizza / 📝 Подтверждение регистрации',
      getVerificationTemplate(code)
    );
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}
