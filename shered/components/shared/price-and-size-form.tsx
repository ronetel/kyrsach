'use client';

import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from './form/form-input';
import { SizeInput } from './size-input';
import { SizeDTO } from '@/shered/services/dto/admin.dto';
import { AddProductFormValues } from '@/shered/hooks/use-add-product-form';

interface PriceAndSizeFormProps {
  isPizza: boolean;
  sizes: SizeDTO[];
  sizesArray: AddProductFormValues['sizes'];
  register: UseFormRegister<AddProductFormValues>;
  errors: FieldErrors<AddProductFormValues>;
  addSizeToProduct: () => void;
  removeSize: (index: number) => void;
}

export const PriceAndSizeForm: React.FC<PriceAndSizeFormProps> = ({
  isPizza,
  sizes,
  sizesArray,
  register,
  errors,
  addSizeToProduct,
  removeSize,
}) => {
  return (
    <>
      {isPizza ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Размеры и цены</h3>
          {(!sizesArray || sizesArray.length === 0) && (
            <p className="text-red-500 mb-2">
              Добавьте хотя бы один размер для пиццы
            </p>
          )}
          {sizesArray?.map((size, index) => (
            <SizeInput
              key={index}
              index={index}
              sizes={sizes}
              register={register}
              errors={errors}
              onRemove={removeSize}
            />
          ))}
          <button
            type="button"
            onClick={addSizeToProduct}
            className="mt-2 bg-[#D32F2F] text-white px-4 py-2 rounded hover:bg-[#b71c1c]"
          >
            Добавить размер
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <FormInput
            name="price"
            label="Цена (₽)"
            type="number"
            required
            className="mb-4"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>
      )}
    </>
  );
};
