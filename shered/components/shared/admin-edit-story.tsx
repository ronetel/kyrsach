'use client';

import React, { useEffect, useState } from 'react';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import { useAdminStore } from '@/shered/store/admin';
import { Button } from '@/shered/components/ui/button';

interface StoryFormData {
  previewImageUrl: string;
  items: { sourceUrl: string }[];
}

interface EditStoryFormProps {
  storyId: number;
}

const EditStoryForm: React.FC<EditStoryFormProps> = ({ storyId }) => {
  const { stories, updateStory, fetchAdminData, loading } = useAdminStore();
  const form = useForm<StoryFormData>({
    defaultValues: {
      previewImageUrl: '',
      items: [{ sourceUrl: '' }],
    },
  });

  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = form;

  const story = stories.find((s) => s.id === storyId);

  useEffect(() => {
    if (story) {
      reset({
        previewImageUrl: story.previewImageUrl,
        items: story.items.map((item) => ({ sourceUrl: item.sourceUrl })),
      });
    }
  }, [story, reset]);

  const onSubmit = async (data: StoryFormData) => {
    try {
      await updateStory(storyId, data);
      await fetchAdminData();
    } catch (error) {
      console.error('Ошибка при обновлении сториса:', error);
    }
  };

  if (loading || !story) {
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
            <label
              htmlFor="previewImageUrl"
              className="block text-sm font-medium mb-1"
            >
              URL превью *
            </label>
            <input
              id="previewImageUrl"
              type="text"
              {...register('previewImageUrl', {
                required: 'URL превью обязателен',
              })}
              className="w-full p-2 bg-[#4A3B3B] rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.previewImageUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.previewImageUrl.message as string}
              </p>
            )}
          </div>
          {fields.map((field, index) => (
            <div key={field.id}>
              <label
                htmlFor={`items[${index}].sourceUrl`}
                className="block text-sm font-medium mb-1"
              >
                URL источника {index + 1} *
              </label>
              <div className="flex gap-2 items-center">
                <input
                  id={`items[${index}].sourceUrl`}
                  type="text"
                  className="w-full p-2 bg-[#4A3B3B] rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {index > 0 && (
                  <Button
                    type="button"
                    variant="red"
                    onClick={() => remove(index)}
                    className="mt-2 w-1/4"
                  >
                    Удалить
                  </Button>
                )}
              </div>
              {errors.items?.[index]?.sourceUrl && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.items[index]?.sourceUrl.message as string}
                </p>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="red"
            onClick={() => append({ sourceUrl: '' })}
            className="w-1/4 mt-2"
          >
            Добавить элемент
          </Button>
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

export default EditStoryForm;
