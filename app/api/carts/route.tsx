import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '../../../prisma/prisma-client';
import { updateCartTotalAmount } from '../../../shered/lib/update-cart-total-amount';
import { CreateCartItemValues } from '../../../shered/services/dto/cart.dto';
import { findOrCreateCart } from '../../../shered/lib/find-or-create-cart';
import { getUserSession } from '@/shered/lib/get-user-session';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shered/constants/auth-options';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;
    const session = await getServerSession(authOptions);

    if (!token && !session?.user.id) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.carts.findFirst({
      where: {
        OR: [
          ...(token ? [{ token }] : []),
          ...(session?.user.id ? [{ userId: session.user.id }] : []),
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                Product: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(userCart || { totalAmount: 0, items: [] });
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json(
      { message: 'Не удалось получить корзину' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;
    const session = await getUserSession();
    const userId = session?.id;

    if (userId) {
      token = undefined;
    } else if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token, userId);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItems.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
    });

    if (findCartItem) {
      await prisma.cartItems.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItems.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token, userId);

    const resp = NextResponse.json(updatedUserCart);

    if (!userId && token) {
      resp.cookies.set('cartToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
    }

    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json(
      { message: 'Не удалось создать корзину' },
      { status: 500 }
    );
  }
}
