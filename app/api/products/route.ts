import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../prisma/prisma-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shered/constants/auth-options';

export async function GET() {
  try {
    const products = await prisma.products.findMany({
      include: {
        ProductItems: {
          include: {
            Size: true,
          },
        },
        Category: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(
      '[PRODUCTS_GET] Server error at',
      new Date().toISOString(),
      error
    );
    return NextResponse.json(
      { message: 'Ошибка при получении продуктов' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== 'Admin') {
      return NextResponse.json(
        { error: 'Доступ запрещён. Требуются права администратора.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, description, imageUrl, categoryId, sizes } = body;

    if (!name || !categoryId) {
      return NextResponse.json(
        { error: 'Название и ID категории обязательны.' },
        { status: 400 }
      );
    }

    const newProduct = await prisma.products.create({
      data: {
        name,
        description,
        imageUrl,
        categoryId,
      },
    });

    if (sizes && sizes.length > 0) {
      const productItems = await prisma.productItems.createMany({
        data: sizes.map((size: { sizeId: number | null; price: number }) => ({
          Product_ID: newProduct.ID_Product,
          Size_ID: size.sizeId !== null ? Number(size.sizeId) : null, // Преобразуем в число или null
          Price: size.price,
        })),
      });
    }

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('[PRODUCTS_POST] Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
