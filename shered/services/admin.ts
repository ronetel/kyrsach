import { axiosInstance } from './instance';
import {
  CategoryDTO,
  SizeDTO,
  ProductDTO,
  OrderDTO,
  UpdateOrderStatusValues,
  AddProductDTO,
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
    await axiosInstance.patch<OrderDTO>(
      `/api/admin/orders/${orderId}/status`,
      values
    )
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
