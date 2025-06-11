'use client';

import React, { useState, useEffect } from 'react';
import { useAdminStore } from '@/shered/store/admin';
import { Button } from '@/shered/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AddProductDTO } from '@/shered/services/dto/admin.dto';

const EditProductPage = () => {
  const { products, loading, fetchAdminData } = useAdminStore();
  const { id } = useParams();
  const productId = Number(id);
  const product = products.find((p) => p.ID_Product === productId);
  const [formData, setFormData] = useState<AddProductDTO>({
    name: '',
    description: '',
    imageUrl: '',
    categoryId: 0,
    sizes: [],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        imageUrl: product.imageUrl || '',
        categoryId: product.categoryId,
        sizes: product.ProductItems.map((item) => ({
          sizeId: item.Size_ID || null,
          price: item.Price,
        })),
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/products/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    await fetchAdminData();
  };

  const handleAddSize = () => {
    setFormData({
      ...formData,
      sizes: [...(formData.sizes || []), { sizeId: null, price: 0 }],
    });
  };

  const handleSizeChange = (
    index: number,
    field: 'sizeId' | 'price',
    value: number
  ) => {
    const newSizes = formData.sizes?.map((size, i) =>
      i === index ? { ...size, [field]: value } : size
    );
    setFormData({ ...formData, sizes: newSizes });
  };

  if (loading || !product) {
    return <div className="text-white text-center mt-10">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-main text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Редактировать товар</h1>
        <Link href="/admin/products">
          <Button variant="red">Назад</Button>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Название"
          className="w-full p-2 bg-[#4A3B3B] rounded text-white"
          required
        />
        <input
          type="text"
          value={formData.description || ''}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Описание"
          className="w-full p-2 bg-[#4A3B3B] rounded text-white"
        />
        <input
          type="text"
          value={formData.imageUrl || ''}
          onChange={(e) =>
            setFormData({ ...formData, imageUrl: e.target.value })
          }
          placeholder="URL изображения"
          className="w-full p-2 bg-[#4A3B3B] rounded text-white"
        />
        <input
          type="number"
          value={formData.categoryId}
          onChange={(e) =>
            setFormData({ ...formData, categoryId: Number(e.target.value) })
          }
          placeholder="ID категории"
          className="w-full p-2 bg-[#4A3B3B] rounded text-white"
          required
        />
        <div>
          <h3 className="text-lg font-semibold mb-2">Размеры и цены</h3>
          {formData.sizes?.map((size, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="number"
                value={size.sizeId || ''}
                onChange={(e) =>
                  handleSizeChange(index, 'sizeId', Number(e.target.value))
                }
                placeholder="ID размера"
                className="w-1/2 p-2 bg-[#4A3B3B] rounded text-white"
              />
              <input
                type="number"
                value={size.price}
                onChange={(e) =>
                  handleSizeChange(index, 'price', Number(e.target.value))
                }
                placeholder="Цена"
                className="w-1/2 p-2 bg-[#4A3B3B] rounded text-white"
              />
            </div>
          ))}
          <Button
            variant="red"
            type="button"
            onClick={handleAddSize}
            className="mt-2"
          >
            Добавить размер
          </Button>
        </div>
        <Button variant="red" type="submit" disabled={loading}>
          Сохранить
        </Button>
      </form>
    </div>
  );
};

export default EditProductPage;
