import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { AddProductDTO } from '@/shered/services/dto/admin.dto';
import { AdminState, useAdminStore } from '../store/admin';

const addProductSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Название должно содержать не менее 2 символов' }),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  categoryId: z.number().min(1, { message: 'Выберите категорию' }),
  price: z
    .number()
    .optional()
    .refine((val) => !val || Number(val) > 0, {
      message: 'Цена должна быть больше 0',
    }),
  sizes: z
    .array(
      z.object({
        sizeId: z.number().min(1, { message: 'Выберите размер' }),
        price: z.string().refine((val) => Number(val) > 0, {
          message: 'Цена должна быть больше 0',
        }),
      })
    )
    .optional(),
});

export type AddProductFormValues = z.infer<typeof addProductSchema>;

interface UseAddProductFormReturn {
  form: ReturnType<typeof useForm<AddProductFormValues>>;
  categories: AdminState['categories'];
  sizes: AdminState['sizes'];
  loading: boolean;
  selectedCategory: string | undefined;
  isPizza: boolean;
  sizesArray: AddProductFormValues['sizes'];
  addSizeToProduct: () => void;
  removeSize: (index: number) => void;
  handleSubmit: (data: AddProductFormValues) => Promise<void>;
}

export const useAddProductForm = (): UseAddProductFormReturn => {
  const { categories, sizes, loading, fetchAdminData, addProduct } =
    useAdminStore();

  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: '',
      description: '',
      imageUrl: '',
      categoryId: categories[0]?.ID_Category || 0,
      price: 0,
      sizes: [],
    },
  });

  const { watch, setValue, reset } = form;
  const selectedCategoryId = watch('categoryId');
  const selectedCategory = categories.find(
    (cat) => cat.ID_Category === selectedCategoryId
  )?.Name_categry;
  const isPizza = selectedCategory === 'Пиццы';
  const sizesArray = watch('sizes') || [];

  useEffect(() => {
    if (!categories.length || !sizes.length) {
      fetchAdminData();
    }
  }, [fetchAdminData, categories.length, sizes.length]);

  const addSizeToProduct = () => {
    if (!sizes[0]?.ID_Size) {
      toast.error('Нет доступных размеров', { icon: '❌' });
      return;
    }
    const newSizes = [
      ...(sizesArray || []),
      { sizeId: sizes[0].ID_Size, price: '' },
    ];
    setValue('sizes', newSizes, { shouldValidate: true });
  };

  const removeSize = (index: number) => {
    const newSizes = sizesArray.filter((_, i) => i !== index);
    setValue('sizes', newSizes, { shouldValidate: true });
  };

  const handleSubmit = async (data: AddProductFormValues) => {
    if (loading) return;

    if (isPizza && (!data.sizes || data.sizes.length === 0)) {
      toast.error('Добавьте хотя бы один размер для пиццы', { icon: '❌' });
      return;
    }
    if (!isPizza && !data.price) {
      toast.error('Укажите цену для продукта', { icon: '❌' });
      return;
    }

    const payload: AddProductDTO = {
      name: data.name,
      description: data.description || undefined,
      imageUrl: data.imageUrl || undefined,
      categoryId: data.categoryId,
      sizes: isPizza
        ? data.sizes?.map((size) => ({
            sizeId: size.sizeId,
            price: Number(size.price),
          }))
        : data.price
          ? [{ sizeId: null, price: Number(data.price) }]
          : [],
    };

    await addProduct(payload);
    reset();
  };

  return {
    form,
    categories,
    sizes,
    loading,
    selectedCategory,
    isPizza,
    sizesArray,
    addSizeToProduct,
    removeSize,
    handleSubmit,
  };
};
