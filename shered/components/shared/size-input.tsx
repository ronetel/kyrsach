'use client';

import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from './form/form-input';
import { RequiredSymbol } from './required-symbol';
import { SizeDTO } from '@/shered/services/dto/admin.dto';
import { AddProductFormValues } from '@/shered/hooks/use-add-product-form';

interface SizeInputProps {
  index: number;
  sizes: SizeDTO[];
  register: UseFormRegister<AddProductFormValues>;
  errors: FieldErrors<AddProductFormValues>;
  onRemove: (index: number) => void;
}

export const SizeInput: React.FC<SizeInputProps> = ({
  index,
  sizes,
  register,
  errors,
  onRemove,
}) => {
  return (
    <div className="flex gap-2 mb-2 items-center">
      <div className="flex-1">
        <label className="block font-medium mb-2">
          Размер <RequiredSymbol />
        </label>
        <select
          {...register(`sizes.${index}.sizeId`, { valueAsNumber: true })}
          className="w-full p-2 bg-[#4A3B3B] text-white rounded h-12 text-md"
        >
          {sizes.map((size) => (
            <option key={size.ID_Size} value={size.ID_Size}>
              {size.Size_name}
            </option>
          ))}
        </select>
        {errors.sizes?.[index]?.sizeId && (
          <p className="text-red-500">{errors.sizes[index].sizeId.message}</p>
        )}
      </div>
      <div className="flex-1">
        <FormInput
          name={`sizes.${index}.price`}
          label="Цена (₽)"
          type="number"
          required
          className="mb-4"
        />
      </div>
      {index > 0 && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="p-2 bg-[#D32F2F] text-white rounded hover:bg-[#b71c1c] mt-8"
        >
          Удалить
        </button>
      )}
    </div>
  );
};
