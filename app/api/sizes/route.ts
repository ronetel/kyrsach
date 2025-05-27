import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function GET() {
  const sizes = await prisma.pizzaSizes.findMany({
    select: { ID_Size: true, Size_name: true },
  });
  return NextResponse.json(sizes);
}