'use client';

import React, { useState, useEffect } from 'react';
import { useAdminStore } from '@/shered/store/admin';
import { Button } from '@/shered/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AddProductDTO } from '@/shered/services/dto/admin.dto';
import toast from 'react-hot-toast';

const EditProductPage = () => {
  const { products, categories, sizes, loading, fetchAdminData } =
    useAdminStore();
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

  // Определяем, является ли продукт пиццей
  const selectedCategory = categories.find(
    (cat) => cat.ID_Category === formData.categoryId
  )?.Name_categry;
  const isPizza = selectedCategory === 'Пиццы';

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
    // Простая клиентская валидация
    if (!formData.name || !formData.categoryId) {
      toast.error('Название и категория обязательны!', { icon: '❌' });
      return;
    }
    if (!formData.sizes || formData.sizes.length === 0) {
      toast.error('Укажите хотя бы одну цену!', { icon: '❌' });
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Товар успешно обновлен!', { icon: '✅' });
        await fetchAdminData();
      } else {
        const errorData = await response.json();
        toast.error(
          `Ошибка: ${errorData.message || 'Не удалось обновить товар'}`,
          { icon: '❌' }
        );
      }
    } catch (error) {
      toast.error('Произошла ошибка при обновлении товара', { icon: '❌' });
    }
  };

  const handleAddSize = () => {
    setFormData({
      ...formData,
      sizes: [
        ...(formData.sizes || []),
        { sizeId: isPizza ? null : 0, price: 0 },
      ],
    });
  };

  const handleSizeChange = (
    index: number,
    field: 'sizeId' | 'price',
    value: number | null
  ) => {
    const newSizes = formData.sizes?.map((size, i) =>
      i === index ? { ...size, [field]: value } : size
    );
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategoryId = Number(e.target.value);
    setFormData({ ...formData, categoryId: newCategoryId });
    // Очищаем sizes или задаем дефолтное значение для не-пицц
    const newSizes =
      categories.find((cat) => cat.ID_Category === newCategoryId)
        ?.Name_categry === 'Пиццы'
        ? formData.sizes || []
        : [{ sizeId: null, price: formData.sizes?.[0]?.price || 0 }];
    setFormData((prev) => ({ ...prev, sizes: newSizes }));
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
        <div>
          <label className="block font-medium mb-1">
            Название <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Название"
            className="w-full p-2 bg-[#4A3B3B] rounded text-white"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Описание</label>
          <input
            type="text"
            value={formData.description || ''}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Описание"
            className="w-full p-2 bg-[#4A3B3B] rounded text-white"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">URL изображения</label>
          <input
            type="text"
            value={formData.imageUrl || ''}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            placeholder="URL изображения"
            className="w-full p-2 bg-[#4A3B3B] rounded text-white"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            Категория <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.categoryId}
            onChange={handleCategoryChange}
            className="w-full p-2 bg-[#4A3B3B] rounded text-white h-12 text-md"
            required
          >
            <option value={0} disabled>
              Выберите категорию
            </option>
            {categories.map((category) => (
              <option key={category.ID_Category} value={category.ID_Category}>
                {category.Name_categry}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Цены</h3>
          {formData.sizes?.map((size, index) => (
            <div key={index} className="flex gap-2 mb-2">
              {isPizza && (
                <div className="w-1/2">
                  <label className="block font-medium mb-1">Размер</label>
                  <select
                    value={size.sizeId || 0}
                    onChange={(e) =>
                      handleSizeChange(
                        index,
                        'sizeId',
                        Number(e.target.value) || null
                      )
                    }
                    className="w-full p-2 bg-[#4A3B3B] rounded text-white h-12 text-md"
                  >
                    <option value={0} disabled>
                      Выберите размер
                    </option>
                    {sizes.map((sizeOption) => (
                      <option
                        key={sizeOption.ID_Size}
                        value={sizeOption.ID_Size}
                      >
                        {sizeOption.Size_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="w-1/2">
                <label className="block font-medium mb-1">Цена</label>
                <input
                  type="number"
                  value={size.price}
                  onChange={(e) =>
                    handleSizeChange(index, 'price', Number(e.target.value))
                  }
                  placeholder="Цена"
                  className="w-full p-2 bg-[#4A3B3B] rounded text-white"
                />
              </div>
            </div>
          ))}
          <Button
            variant="red"
            type="button"
            onClick={handleAddSize}
            className="mt-2"
          >
            Добавить цену
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
