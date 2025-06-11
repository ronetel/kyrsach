'use client';

import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAdminStore } from '@/shered/store/admin';
import { Button } from '@/shered/components/ui/button';

interface CategoryFormData {
  name: string;
}

interface EditCategoryFormProps {
  categoryId: number;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ categoryId }) => {
  const { categories, updateCategory, fetchAdminData, loading } =
    useAdminStore();
  const form = useForm<CategoryFormData>({
    defaultValues: { name: '' },
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = form;

  const category = categories.find((c) => c.ID_Category === categoryId);

  useEffect(() => {
    if (category) {
      reset({ name: category.Name_categry });
    }
  }, [category, reset]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await updateCategory(categoryId, data.name);
      await fetchAdminData();
    } catch (error) {
      console.error('Ошибка при обновлении категории:', error);
    }
  };

  if (loading || !category) {
    return <div className="text-white text-center mt-10">Загрузка...</div>;
  }

  return (
    <section className="mb-10">
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#3A2B2B] p-6 rounded-lg shadow-lg space-y-6"
        >
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-500/20 p-3 rounded text-red-100">
              Исправьте ошибки:
              <ul className="list-disc list-inside mt-2">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}
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
          <Button
            type="submit"
            variant="red"
            className="w-full mt-4 py-2"
            disabled={loading}
          >
            Сохранить
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default EditCategoryForm;
