'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ProductDetailsForm } from './product-details-form';
import { PriceAndSizeForm } from './price-and-size-form';
import { useAddProductForm } from '@/shered/hooks/use-add-product-form';
import { Button } from '@/shered/components/ui/button';

const AddProductForm: React.FC = () => {
  const {
    form: defaultForm,
    categories,
    sizes,
    loading,
    isPizza,
    sizesArray,
    addSizeToProduct,
    removeSize,
    handleSubmit,
  } = useAddProductForm();

  const form = useForm({
    defaultValues: defaultForm.getValues(),
  });

  const {
    formState: { errors },
  } = form;

  if (loading) {
    return <p className="text-white text-center mt-10">Загрузка...</p>;
  }

  if (categories.length === 0) {
    return (
      <p className="text-red-500 mb-4 text-center">Категории не загружены</p>
    );
  }

  if (isPizza && sizes.length === 0) {
    return (
      <p className="text-red-500 mb-4 text-center">Размеры не загружены</p>
    );
  }

  return (
    <section className="mb-10">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="bg-[#3A2B2B] p-6 rounded-lg shadow-lg space-y-6"
        >
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-500/20 p-3 rounded text-red-100">
              Исправьте ошибки в полях ниже:
              <ul className="list-disc list-inside mt-2">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}
          <ProductDetailsForm categories={categories} />
          <PriceAndSizeForm
            isPizza={isPizza}
            sizes={sizes}
            sizesArray={sizesArray}
            addSizeToProduct={addSizeToProduct}
            removeSize={removeSize}
          />
          <Button
            type="submit"
            variant="red"
            className="w-full mt-4 py-2"
            disabled={loading}
          >
            Добавить товар
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default AddProductForm;
