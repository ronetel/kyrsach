import {
  ProductCategories,
  Products,
  PizzaSizes,
  Orders,
  Users,
} from '@prisma/client';

export type CategoryDTO = ProductCategories;

export type SizeDTO = PizzaSizes;

export interface ProductDTO extends Products {
  Category?: ProductCategories;
}

export interface UserDTO extends Pick<Users, 'Name_user' | 'Email_user'> {}

export interface OrderDTO
  extends Omit<Orders, 'createdAt' | 'updatedAt' | 'totalAmount'> {
  date: string;
  updatedAt: string;
  address: string;
  total: number;
  items: any;
  points: number;
  user: UserDTO;
  status: 'PENDING' | 'SUCCEEDED' | 'CANCELLED';
}

// DTO для добавления товара
export interface SizePrice {
  sizeId: number | null;
  price: number;
}

export interface AddProductDTO {
  name: string;
  description?: string;
  imageUrl?: string;
  categoryId: number;
  sizes?: SizePrice[];
}

// Значения для обновления статуса заказа
export interface UpdateOrderStatusValues {
  status: 'PENDING' | 'SUCCEEDED' | 'CANCELLED';
}
