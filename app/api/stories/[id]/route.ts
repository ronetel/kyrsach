import { prisma } from '@/prisma/prisma-client';
import { authOptions } from '@/shered/constants/auth-options';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

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
    const storyId = Number(id);

    if (!id) {
      return NextResponse.json(
        { error: 'ID сториса обязателен' },
        { status: 400 }
      );
    }

    await prisma.story.delete({
      where: { id: storyId },
    });

    return NextResponse.json({ message: 'Сторис удалён' });
  } catch (error) {
    console.error('[STORIES_DELETE] Ошибка:', error);
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
    const storyId = Number(id);
    const body = await request.json();
    const { previewImageUrl, items } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID сториса обязателен' },
        { status: 400 }
      );
    }

    const updatedStory = await prisma.story.update({
      where: { id: storyId },
      data: {
        previewImageUrl,
        items: {
          deleteMany: {},
          create: items?.map((item: { sourceUrl: string }) => ({
            sourceUrl: item.sourceUrl,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(updatedStory);
  } catch (error) {
    console.error('[STORIES_PATCH] Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
