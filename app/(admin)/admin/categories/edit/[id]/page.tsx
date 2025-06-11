'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/shered/components/ui/button';
import { useAdminStore } from '@/shered/store/admin';
import { useParams } from 'next/navigation';
import EditCategoryForm from '@/shered/components/shared/admin-edit-category';

export default function EditCategoryPage() {
  const { loading, fetchAdminData } = useAdminStore();
  const { id } = useParams();
  const categoryId = Number(id);

  useEffect(() => {
    fetchAdminData(true);
  }, [fetchAdminData]);

  if (loading) {
    return <div className="text-white text-center mt-10">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-main text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Редактировать категорию</h1>
        <Link href="/admin/categories">
          <Button variant="red">Назад</Button>
        </Link>
      </div>
      <div className="max-w-2xl mx-auto">
        <EditCategoryForm categoryId={categoryId} />
      </div>
    </div>
  );
}
