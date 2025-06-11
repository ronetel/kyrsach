import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shered/constants/auth-options';

export async function GET() {
  try {
    const stories = await prisma.story.findMany({
      include: { items: true },
    });

    return NextResponse.json(stories);
  } catch (error) {
    console.error('[STORIES_GET] Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
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
    const { previewImageUrl, items } = body;

    if (!previewImageUrl || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Необходимо указать URL превью и массив элементов.' },
        { status: 400 }
      );
    }

    const newStory = await prisma.story.create({
      data: {
        previewImageUrl,
        items: {
          create: items.map((item: { sourceUrl: string }) => ({
            sourceUrl: item.sourceUrl,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(newStory, { status: 201 });
  } catch (error) {
    console.error('[STORIES_POST] Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
