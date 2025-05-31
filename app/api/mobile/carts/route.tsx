import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shered/constants/auth-options';
import { prisma } from '@/prisma/prisma-client';
import { CreateCartItemValues } from '@/shered/services/dto/cart.dto';
import { updateCartTotalAmount } from '@/shered/lib/update-cart-total-amount';
import jwt from 'jsonwebtoken';

const verifyToken = (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as {
      id: number;
      email: string;
    };
    return decoded;
  } catch (error) {
    return null;
  }
};

export async function GET(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Необходима авторизация' },
        { status: 401 }
      );
    }

    const userId = Number(decoded.id);

    const userCart = await prisma.carts.findFirst({
      where: {
        userId: userId,
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
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Необходима авторизация' },
        { status: 401 }
      );
    }

    const userId = Number(decoded.id);

    let userCart = await prisma.carts.findFirst({
      where: { userId },
    });

    if (!userCart) {
      userCart = await prisma.carts.create({
        data: {
          userId,
          totalAmount: 0,
        },
      });
    }

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

    const updatedUserCart = await updateCartTotalAmount(undefined, userId);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json(
      { message: 'Не удалось добавить товар в корзину' },
      { status: 500 }
    );
  }
}
