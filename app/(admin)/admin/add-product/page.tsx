'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/shered/components/ui/button';
import AddProductForm from '@/shered/components/shared/admin-add-product';
import { useAdminStore } from '@/shered/store/admin';
import { getUserSession } from '@/shered/lib/get-user-session';
import { redirect } from 'next/navigation';
import { prisma } from '@/prisma/prisma-client';

export default function AddProductPage() {
  const { loading, fetchAdminData, IsAdminData } = useAdminStore();

  useEffect(() => {
    fetchAdminData();
    IsAdminData();
  }, [fetchAdminData]);

  if (loading) {
    return <div className="text-white text-center mt-10">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-main text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Добавить товар</h1>
        <Link href="/admin">
          <Button variant="red">Назад</Button>
        </Link>
      </div>
      <AddProductForm />
    </div>
  );
}
