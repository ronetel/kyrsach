import { prisma } from '../../prisma/prisma-client';
import { CartDTO, CartItemDTO } from '../services/dto/cart.dto';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

export const updateCartTotalAmount = async (
  token?: string,
  userId?: number
): Promise<CartDTO> => {
  if (!token && !userId) {
    throw new Error('Either token or userId must be provided');
  }

  const userCart = await prisma.carts.findFirst({
    where: {
      OR: [...(token ? [{ token }] : []), ...(userId ? [{ userId }] : [])],
    },
    include: {
      items: {
        orderBy: { createdAt: 'desc' },
        include: {
          productItem: {
            include: {
              Product: true,
              Size: true,
            },
          },
        },
      },
    },
  });

  if (!userCart) {
    throw new Error('Cart not found');
  }

  const totalAmount = userCart.items.reduce((acc, item) => {
    return acc + calcCartItemTotalPrice(item);
  }, 0);
  return await prisma.carts.update({
    where: { id: userCart.id },
    data: { totalAmount },
    include: {
      items: {
        include: {
          productItem: {
            include: {
              Product: true,
              Size: true,
            },
          },
        },
      },
    },
  });
};
