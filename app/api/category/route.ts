import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function GET() {
  try {
    const categories = await prisma.productCategories.findMany({
      include: {
        Products: {
          include: {
            ProductItems: {
              include: {
                Size: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
