'use client';

import React, { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Button } from '@/shered/components/ui/button';

const AdminPanel: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || session.user.role !== 'Admin') {
      router.push('/');
      toast.error('Доступ запрещён', { icon: '❌' });
      return;
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div className="text-white text-center mt-10">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-main text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Панель администратора</h1>
        <Button variant="red" onClick={() => signOut({ callbackUrl: '/' })}>
          Выйти
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/products">
          <Button variant="red" className="w-full">
            Товары
          </Button>
        </Link>
        <Link href="/admin/categories">
          <Button variant="red" className="w-full">
            Категории
          </Button>
        </Link>
        <Link href="/admin/orders">
          <Button variant="red" className="w-full">
            Заказы
          </Button>
        </Link>
        <Link href="/admin/users">
          <Button variant="red" className="w-full">
            Пользователи
          </Button>
        </Link>
        <Link href="/admin/stories">
          <Button variant="red" className="w-full">
            Сторисы
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;
