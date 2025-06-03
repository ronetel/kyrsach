'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';
import { ProductDetailsForm } from './product-details-form';
import { PriceAndSizeForm } from './price-and-size-form';
import { useAddProductForm } from '@/shered/hooks/use-add-product-form';

const AddProductForm: React.FC = () => {
  const {
    form,
    categories,
    sizes,
    loading,
    isPizza,
    sizesArray,
    addSizeToProduct,
    removeSize,
    handleSubmit,
  } = useAddProductForm();

  const {
    formState: { errors },
    register,
  } = form;

  if (loading) {
    return <p className="text-white text-center mt-10">Загрузка...</p>;
  }

  return (
    <section className="mb-10">
      {categories.length === 0 && (
        <p className="text-red-500 mb-4">Категории не загружены</p>
      )}
      {isPizza && sizes.length === 0 && (
        <p className="text-red-500 mb-4">Размеры не загружены</p>
      )}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="bg-[#3A2B2B] p-6 rounded-lg shadow-lg"
        >
          {Object.keys(errors).length > 0 && (
            <p className="text-red-500 mb-4">
              Проверьте правильность заполнения формы
            </p>
          )}
          <ProductDetailsForm categories={categories} register={register} />
          <PriceAndSizeForm
            isPizza={isPizza}
            sizes={sizes}
            sizesArray={sizesArray}
            register={register}
            errors={errors}
            addSizeToProduct={addSizeToProduct}
            removeSize={removeSize}
          />
          <button
            type="submit"
            className="mt-4 bg-[#D32F2F] text-white px-4 py-2 rounded hover:bg-[#b71c1c]"
            disabled={loading}
          >
            Добавить товар
          </button>
        </form>
      </FormProvider>
    </section>
  );
};

export default AddProductForm;
