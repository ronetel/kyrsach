'use client';

import React, { useEffect } from 'react';
import { useAdminStore } from '@/shered/store/admin';
import { Button } from '@/shered/components/ui/button';
import Link from 'next/link';
import { deleteCategory } from '@/shered/services/admin';

const CategoriesPage = () => {
  const { categories, loading, fetchAdminData } = useAdminStore();

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  if (loading) {
    return <div className="text-white text-center mt-10">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-main text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <Link href="/admin">
          <Button variant="red">Назад</Button>
        </Link>
        <h1 className="text-3xl font-bold">Управление категориями</h1>
        <Link href="/admin/categories/add">
          <Button variant="red">Добавить категорию</Button>
        </Link>
      </div>
      <div className="space-y-4">
        {categories.length === 0 ? (
          <p>Категории отсутствуют.</p>
        ) : (
          categories.map((category) => (
            <div
              key={category.ID_Category}
              className="bg-[#3A2B2B] p-4 rounded-lg shadow-lg flex justify-between items-center"
            >
              <p className="text-lg font-semibold">{category.Name_categry}</p>
              <div className="flex gap-2">
                <Link href={`/admin/categories/edit/${category.ID_Category}`}>
                  <Button variant="red">Редактировать</Button>
                </Link>
                <Button
                  variant="red"
                  onClick={() => deleteCategory(category.ID_Category)}
                >
                  Удалить
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
