// @/shered/components/shared/price-and-size-form.tsx
'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';

interface PriceAndSizeFormProps {
  isPizza: boolean;
  sizes: { ID_Size: number; Size_name: string }[];
  sizesArray: { sizeId: number | null; price: string }[] | undefined;
  addSizeToProduct: () => void;
  removeSize: (index: number) => void;
}

export const PriceAndSizeForm: React.FC<PriceAndSizeFormProps> = ({
  isPizza,
  sizes,
  sizesArray,
  addSizeToProduct,
  removeSize,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  if (!isPizza) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Размеры и цены</h3>
      {sizesArray?.map((size, index) => (
        <div key={index} className="grid grid-cols-2 gap-4 items-center">
          <div>
            <label
              htmlFor={`sizes[${index}].sizeId`}
              className="block text-sm font-medium mb-1"
            >
              Размер *
            </label>
            <select
              id={`sizes[${index}].sizeId`}
              {...register(`sizes[${index}].sizeId`, {
                required: 'Размер обязателен',
              })}
              className="w-full p-2 bg-[#4A3B3B] rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              defaultValue={size.sizeId || ''}
            >
              <option value="">Выберите размер</option>
              {sizes.map((s) => (
                <option key={s.ID_Size} value={s.ID_Size}>
                  {s.Size_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor={`sizes[${index}].price`}
              className="block text-sm font-medium mb-1"
            >
              Цена *
            </label>
            <input
              id={`sizes[${index}].price`}
              type="number"
              step="0.01"
              {...register(`sizes[${index}].price`, {
                required: 'Цена обязательна',
                min: { value: 0, message: 'Цена должна быть положительной' },
                valueAsNumber: true, // Гарантируем, что значение будет number
              })}
              defaultValue={size.price}
              className="w-full p-2 bg-[#4A3B3B] rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <Button
            variant="red"
            type="button"
            onClick={() => removeSize(index)}
            className="col-span-2 w-1/4 mt-2"
            disabled={sizesArray.length <= 1}
          >
            Удалить размер
          </Button>
        </div>
      ))}
      <Button
        variant="red"
        type="button"
        onClick={addSizeToProduct}
        className="w-1/4 mt-2"
      >
        Добавить размер
      </Button>
    </div>
  );
};
