import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { Prisma } from '@prisma/client';
import { registerUser } from '@/app/actions';

// Тип для входных данных регистрации
interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string; // Опциональное поле
}

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const body = await req.json();
  const { name, email, password, phone } = body as RegisterInput;

  // Проверка обязательных полей
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: 'All fields (name, email, password) are required' },
      { status: 400 }
    );
  }

  try {
    // Подготовка данных для registerUser
    const userData: Prisma.UsersCreateInput = {
      Name_user: name,
      Email_user: email,
      Password_user: password, // Функция registerUser сама выполнит хеширование
      Phone: phone || null,
    };

    // Вызов функции registerUser
    await registerUser(userData);

    // Если регистрация прошла успешно, возвращаем успешный ответ
    return NextResponse.json(
      {
        success: true,
        message: 'Регистрация успешна. Проверьте email для подтверждения.',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[Register API] Error at', new Date().toISOString(), error);
    if (error.message === 'Пользователь уже существует') {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      );
    } else if (error.message === 'Почта не подтверждена') {
      return NextResponse.json(
        { error: 'Почта не подтверждена для этого email' },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  } finally {
    await prisma.$disconnect();
  }
}
