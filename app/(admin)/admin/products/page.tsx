'use client';

import React, { useEffect } from 'react';
import { useAdminStore } from '@/shered/store/admin';
import { Button } from '@/shered/components/ui/button';
import Link from 'next/link';

const ProductsPage = () => {
  const { products, loading, fetchAdminData, deleteProduct } = useAdminStore();

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  if (loading) {
    return <div className="text-white text-center mt-10">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-main text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Управление товарами</h1>
        <Link href="/admin/products/add">
          <Button variant="red">Добавить товар</Button>
        </Link>
      </div>
      <div className="space-y-4">
        {products.length === 0 ? (
          <p>Товары отсутствуют.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.ID_Product}
              className="bg-[#3A2B2B] p-4 rounded-lg shadow-lg flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">{product.name}</p>
                <p>
                  Категория: {product.Category?.Name_categry || 'Без категории'}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/products/edit/${product.ID_Product}`}>
                  <Button variant="red">Редактировать</Button>
                </Link>
                <Button
                  variant="red"
                  onClick={() => deleteProduct(product.ID_Product)}
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

export default ProductsPage;
