'use client';

import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from './form/form-input';
import { RequiredSymbol } from './required-symbol';
import { CategoryDTO } from '@/shered/services/dto/admin.dto';
import { AddProductFormValues } from '@/shered/hooks/use-add-product-form';

interface ProductDetailsFormProps {
  categories: CategoryDTO[];
  register: UseFormRegister<AddProductFormValues>;
  errors: FieldErrors<AddProductFormValues>;
}

export const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({
  categories,
  register,
  errors,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <FormInput name="name" label="Название" required className="mb-4" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <FormInput name="description" label="Описание" className="mb-4" />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div>
        <FormInput name="imageUrl" label="URL изображения" className="mb-4" />
        {errors.imageUrl && (
          <p className="text-red-500">{errors.imageUrl.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">
          Категория <RequiredSymbol />
        </label>
        <select
          {...register('categoryId', { valueAsNumber: true })}
          className="w-full p-2 bg-[#4A3B3B] text-white rounded h-12 text-md"
          defaultValue={categories[0]?.ID_Category || 0}
        >
          <option value={0} disabled>
            Выберите категорию
          </option>
          {categories.map((cat) => (
            <option key={cat.ID_Category} value={cat.ID_Category}>
              {cat.Name_categry}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-red-500">{errors.categoryId.message}</p>
        )}
      </div>
    </div>
  );
};
