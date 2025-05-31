import { NextRequest, NextResponse } from 'next/server';
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

export async function PATCH(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Необходима авторизация' },
        { status: 401 }
      );
    }

    const userId = Number(decoded.id);
    const id = Number(new URL(req.url).pathname.split('/').pop());
    const data = (await req.json()) as { quantity: number };

    const cartItem = await prisma.cartItems.findUnique({
      where: { id: Number(id) },
      include: { cart: true },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      );
    }

    if (cartItem.cart.userId !== userId) {
      return NextResponse.json(
        { error: 'У вас нет доступа к этому элементу корзины' },
        { status: 403 }
      );
    }

    await prisma.cartItems.update({
      where: { id: Number(id) },
      data: { quantity: data.quantity },
    });

    const updatedUserCart = await updateCartTotalAmount(undefined, userId);

    if (!updatedUserCart) {
      return NextResponse.json(
        { error: 'Failed to update cart' },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.error('[CART_PATCH] Server error', error);
    return NextResponse.json(
      { message: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Необходима авторизация' },
        { status: 401 }
      );
    }

    const userId = Number(decoded.id);
    const id = Number(new URL(req.url).pathname.split('/').pop());

    const cartItem = await prisma.cartItems.findFirst({
      where: { id: Number(id) },
      include: { cart: true },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      );
    }

    if (cartItem.cart.userId !== userId) {
      return NextResponse.json(
        { error: 'У вас нет доступа к этому элементу корзины' },
        { status: 403 }
      );
    }

    await prisma.cartItems.delete({ where: { id: Number(id) } });

    const updatedUserCart = await updateCartTotalAmount(undefined, userId);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.error('[CART_DELETE] Server error', error);
    return NextResponse.json(
      { message: 'Failed to delete cart item' },
      { status: 500 }
    );
  }
}
