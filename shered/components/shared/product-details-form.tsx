'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

interface ProductDetailsFormProps {
  categories: { ID_Category: number; Name_categry: string }[];
}

export const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({
  categories,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Название *
        </label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Название обязательно' })}
          className="w-full p-2 bg-[#4A3B3B] rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message as string}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
          URL изображения
        </label>
        <input
          id="imageUrl"
          type="text"
          {...register('imageUrl')}
          className="w-full p-2 bg-[#4A3B3B] rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Описание
        </label>
        <textarea
          id="description"
          {...register('description')}
          className="w-full p-2 bg-[#4A3B3B] rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500 h-24 resize-y"
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="categoryId" className="block text-sm font-medium mb-1">
          Категория *
        </label>
        <select
          id="categoryId"
          {...register('categoryId', { required: 'Категория обязательна' })}
          className="w-full p-2 bg-[#4A3B3B] rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Выберите категорию</option>
          {categories.map((category) => (
            <option key={category.ID_Category} value={category.ID_Category}>
              {category.Name_categry}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.categoryId.message as string}
          </p>
        )}
      </div>
    </div>
  );
};
