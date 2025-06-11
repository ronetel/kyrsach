import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shered/constants/auth-options';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== 'Admin') {
      return NextResponse.json(
        { error: 'Доступ запрещён. Требуются права администратора.' },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const categoryId = Number(id);

    if (!id) {
      return NextResponse.json(
        { error: 'ID категории обязателен' },
        { status: 400 }
      );
    }

    await prisma.productCategories.delete({
      where: { ID_Category: categoryId },
    });

    return NextResponse.json({ message: 'Категория удалена' });
  } catch (error) {
    console.error('[CATEGORIES_DELETE] Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== 'Admin') {
      return NextResponse.json(
        { error: 'Доступ запрещён. Требуются права администратора.' },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const categoryId = Number(id);
    const body = await request.json();
    const { Name_categry } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID категории обязателен' },
        { status: 400 }
      );
    }

    const updatedCategory = await prisma.productCategories.update({
      where: { ID_Category: categoryId },
      data: { Name_categry },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('[CATEGORIES_PATCH] Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
