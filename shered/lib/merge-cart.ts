import { prisma } from '@/prisma/prisma-client';
import crypto from 'crypto';
import { updateCartTotalAmount } from './update-cart-total-amount';

export const mergeCarts = async (
  userId: number,
  anonymousCartToken?: string
) => {
  try {
    let userCart = await prisma.carts.findFirst({
      where: { userId },
      include: { items: true },
    });

    if (!userCart) {
      userCart = await prisma.carts.create({
        data: {
          userId,
          token: crypto.randomUUID(),
          totalAmount: 0,
        },
        include: { items: true },
      });
      console.log('Создана новая корзина для пользователя:', userCart.id);
      return userCart;
    }

    if (anonymousCartToken) {
      const anonymousCart = await prisma.carts.findFirst({
        where: {
          token: anonymousCartToken,
          userId: null,
        },
        include: { items: true },
      });

      if (anonymousCart) {
        console.log('Объединяем с анонимной корзиной:', anonymousCart.id);
        for (const item of anonymousCart.items) {
          const existingItem = userCart.items.find(
            (i) => i.productItemId === item.productItemId
          );

          if (existingItem) {
            await prisma.cartItems.update({
              where: { id: existingItem.id },
              data: { quantity: existingItem.quantity + item.quantity },
            });
          } else {
            await prisma.cartItems.create({
              data: {
                cartId: userCart.id,
                productItemId: item.productItemId,
                quantity: item.quantity,
              },
            });
          }
        }

        await prisma.$transaction([
          prisma.cartItems.deleteMany({ where: { cartId: anonymousCart.id } }),
          prisma.carts.delete({ where: { id: anonymousCart.id } }),
        ]);
      } else {
        console.log(
          'Анонимная корзина не найдена, работаем с корзиной пользователя'
        );
      }
    }

    return await updateCartTotalAmount(undefined, userId);
  } catch (error) {
    console.error('Ошибка при работе с корзиной:', error);
    throw error;
  }
};
