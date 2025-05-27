import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';
import { updateCartTotalAmount } from '../../../../shered/lib/update-cart-total-amount';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shered/constants/auth-options';
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const id = Number(new URL(req.url).pathname.split('/').pop());
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;
    const userId = session?.user.id;

    const cartItem = await prisma.cartItems.findUnique({
      where: { id: Number(id) },
      include: { cart: true }
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      );
    }

    await prisma.cartItems.update({
      where: { id: Number(id) },
      data: { quantity: data.quantity }
    });

    const updatedUserCart = await updateCartTotalAmount(token, userId);
    
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
    const session = await getServerSession(authOptions);
    const id = Number(new URL(req.url).pathname.split('/').pop());
    const token = req.cookies.get('cartToken')?.value;
    const userId = session?.user.id;

    const cartItem = await prisma.cartItems.findFirst({
      where: { id: Number(id) }, 
      include: { cart: true }
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      );
    }

    await prisma.cartItems.delete({ where: { id: Number(id) } });
    
    const updatedUserCart = await updateCartTotalAmount(token, userId);

    return NextResponse.json(updatedUserCart);
    
  } catch (error) {
    console.error('[CART_DELETE] Server error', error);
    return NextResponse.json(
      { message: 'Failed to delete cart item' },
      { status: 500 }
    );
  }
}