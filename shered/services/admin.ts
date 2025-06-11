// @/shered/services/api-client.ts
import { axiosInstance } from './instance';
import {
  CategoryDTO,
  SizeDTO,
  ProductDTO,
  OrderDTO,
  UpdateOrderStatusValues,
  AddProductDTO,
  UserDTO,
  StoryDTO,
} from './dto/admin.dto';

export const getCategories = async (): Promise<CategoryDTO[]> => {
  return (await axiosInstance.get<CategoryDTO[]>('/api/categories')).data;
};

export const getSizes = async (): Promise<SizeDTO[]> => {
  return (await axiosInstance.get<SizeDTO[]>('/api/sizes')).data;
};

export const getProducts = async (): Promise<ProductDTO[]> => {
  return (await axiosInstance.get<ProductDTO[]>('/api/products')).data;
};

export const getOrders = async (): Promise<OrderDTO[]> => {
  return (await axiosInstance.get<OrderDTO[]>('/api/orders')).data;
};

export const updateOrderStatus = async (
  orderId: number,
  values: UpdateOrderStatusValues
): Promise<OrderDTO> => {
  return (
    await axiosInstance.patch<OrderDTO>(`/api/orders/${orderId}/status`, values)
  ).data;
};

export const deleteProduct = async (productId: number): Promise<void> => {
  await axiosInstance.delete(`/api/products/${productId}`);
};

export const addProduct = async (
  productData: AddProductDTO
): Promise<ProductDTO> => {
  return (await axiosInstance.post<ProductDTO>('/api/products', productData))
    .data;
};

// Предполагаемые методы для категорий
export const getCategoriesList = async (): Promise<CategoryDTO[]> => {
  return (await axiosInstance.get<CategoryDTO[]>('/api/categories')).data;
};

export const addCategory = async (name: string): Promise<CategoryDTO> => {
  return (await axiosInstance.post<CategoryDTO>('/api/categories', { name }))
    .data;
};

export const deleteCategory = async (categoryId: number): Promise<void> => {
  await axiosInstance.delete(`/api/categories/${categoryId}`);
};

export const updateCategory = async (
  categoryId: number,
  name: string
): Promise<CategoryDTO> => {
  return (
    await axiosInstance.patch<CategoryDTO>(`/api/categories/${categoryId}`, {
      name,
    })
  ).data;
};

// Предполагаемые методы для пользователей
export const getUsers = async (): Promise<UserDTO[]> => {
  return (await axiosInstance.get<UserDTO[]>('/api/users')).data;
};

export const addUser = async (userData: UserDTO): Promise<UserDTO> => {
  return (await axiosInstance.post<UserDTO>('/api/users', userData)).data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await axiosInstance.delete(`/api/users/${userId}`);
};

export const updateUser = async (
  userId: number,
  userData: Partial<UserDTO>
): Promise<UserDTO> => {
  return (await axiosInstance.patch<UserDTO>(`/api/users/${userId}`, userData))
    .data;
};

// Предполагаемые методы для сторисов
export const getStories = async (): Promise<StoryDTO[]> => {
  return (await axiosInstance.get<StoryDTO[]>('/api/stories')).data;
};

export const addStory = async (storyData: {
  previewImageUrl: string;
  items: { sourceUrl: string }[];
}): Promise<StoryDTO> => {
  return (await axiosInstance.post<StoryDTO>('/api/stories', storyData)).data;
};

export const deleteStory = async (storyId: number): Promise<void> => {
  await axiosInstance.delete(`/api/stories/${storyId}`);
};

export const updateStory = async (
  storyId: number,
  storyData: { previewImageUrl: string; items: { sourceUrl: string }[] }
): Promise<StoryDTO> => {
  return (
    await axiosInstance.patch<StoryDTO>(`/api/stories/${storyId}`, storyData)
  ).data;
};
