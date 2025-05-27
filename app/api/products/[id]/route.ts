import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shered/constants/auth-options';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session.user.role !== 'Admin') {
      return NextResponse.json(
        { message: 'Только администраторы могут изменять товары' },
        { status: 403 }
      );
    }

    const ids = Number(id);
    const data = await req.json();
    const { name, description, imageUrl, categoryId, sizes } = data;

    if (!id) {
      return NextResponse.json(
        { message: 'ID товара обязателен' },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.products.update({
      where: { ID_Product: ids },
      data: {
        name,
        description: description || null,
        imageUrl: imageUrl || null,
        categoryId,
        ProductItems: {
          deleteMany: {},
          create: sizes?.map((size: { sizeId: number; price: number }) => ({
            Size_ID: size.sizeId,
            Price: size.price,
          })),
        },
      },
      include: {
        ProductItems: {
          include: {
            Size: true,
          },
        },
        Category: true,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(
      '[PRODUCTS_PATCH] Server error at',
      new Date().toISOString(),
      error
    );
    return NextResponse.json(
      { message: 'Ошибка при обновлении товара' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await context.params;
    const productId = Number(id);

    if (!session?.user?.id || session.user.role !== 'Admin') {
      return NextResponse.json(
        { message: 'Только администраторы могут удалять товары' },
        { status: 403 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { message: 'ID товара обязателен' },
        { status: 400 }
      );
    }

    const deletedProduct = await prisma.$transaction(async (tx) => {
      await tx.productItems.deleteMany({
        where: { Product_ID: productId },
      });

      return tx.products.delete({
        where: { ID_Product: productId },
        include: { ProductItems: true, Category: true },
      });
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error(
      '[PRODUCTS_DELETE] Server error at',
      new Date().toISOString(),
      error
    );
    return NextResponse.json(
      { message: 'Ошибка при удалении товара' },
      { status: 500 }
    );
  }
}
