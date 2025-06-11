import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shered/constants/auth-options';

export async function GET() {
  const products = await prisma.productCategories.findMany();
  return NextResponse.json(products);
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
    const { name } = body; // Изменено с Name_categry на name для соответствия клиентскому коду

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        {
          error:
            'Название категории обязательно и должно содержать минимум 2 символа',
        },
        { status: 400 }
      );
    }

    const newCategory = await prisma.productCategories.create({
      data: { Name_categry: name.trim() }, // Преобразуем в Name_categry для базы данных
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('[CATEGORIES_POST] Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
