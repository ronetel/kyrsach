import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { mergeCarts } from '@/shered/lib/merge-cart';

export async function POST(req: NextRequest) {
  try {
    const { userId, cartToken } = await req.json();

    if (!userId || !cartToken) {
      return NextResponse.json(
        { message: 'userId и cartToken обязательны' },
        { status: 400 }
      );
    }

    await mergeCarts(Number(userId), cartToken);

    return NextResponse.json({ message: 'Корзина успешно объединена' });
  } catch (error) {
    console.error(
      '[MERGE_CART] Server error at',
      new Date().toISOString(),
      error
    );
    return NextResponse.json(
      { message: 'Ошибка при объединении корзины' },
      { status: 500 }
    );
  }
}
