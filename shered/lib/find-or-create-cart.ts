import { prisma } from "@/prisma/prisma-client";

export const findOrCreateCart = async (token?: string, userId?: number) => {
  if (!token && !userId) {
    throw new Error('Необходим token или userId');
  }

  let userCart = await prisma.carts.findFirst({
    where: {
      OR: [
        ...(token ? [{ token }] : []),
        ...(userId ? [{ userId }] : []),
      ],
    },
  });

  if (!userCart) {
    userCart = await prisma.carts.create({
      data: {
        ...(token && { token }),
        ...(userId && { userId }),
        totalAmount: 0,
      },
    });
  } else if (userId && !userCart.userId) {
    userCart = await prisma.carts.update({
      where: { id: userCart.id },
      data: { userId },
    });
  }

  return userCart;
};