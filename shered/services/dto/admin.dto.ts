// @/shered/services/dto/admin.dto.ts
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
  ProductItems: {
    Id: number;
    Size_ID?: number;
    Price: number;
    Size?: SizeDTO;
  }[];
}

export interface UserDTO extends Users {
  // Добавляем все поля из Users для полноты
}

export interface StoryDTO {
  id: number;
  previewImageUrl: string;
  items: { id: number; sourceUrl: string }[];
  createdAt: Date;
}

export interface OrderDTO
  extends Omit<Orders, 'createdAt' | 'updatedAt' | 'totalAmount'> {
  date: string;
  updatedAt: string;
  address: string;
  total: number;
  items: any[]; // Замените на конкретный тип, если есть
  points: number;
  user: UserDTO;
  status: 'PENDING' | 'SUCCEEDED' | 'CANCELLED';
}

export interface SizePrice {
  sizeId: number | null;
  price: number;
}

export interface AddProductDTO {
  name: string;
  description?: string;
  imageUrl?: string;
  categoryId: number;
  sizes?: SizePrice[] | undefined;
}

export interface UpdateOrderStatusValues {
  status: 'PENDING' | 'SUCCEEDED' | 'CANCELLED';
}
