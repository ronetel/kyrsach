import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client'; // Убедись, что путь правильный
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    // Извлекаем токен из заголовка Authorization
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization header missing or invalid' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // Верифицируем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as {
      id: number;
      email: string;
    };

    // Ищем пользователя в базе данных
    const user = await prisma.users.findFirst({
      where: {
        ID_User: decoded.id,
        Email_user: decoded.email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Возвращаем данные пользователя
    return NextResponse.json(
      {
        id: user.ID_User,
        email: user.Email_user,
        name: user.Name_user,
        role: user.role,
        points: user.Points,
        phone: user.Phone,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
