import { ProductItems, Products, PizzaSizes } from '@prisma/client';

export interface OrderItemDTO {
  id: number;
  quantity: number;
  productItem: ProductItemDTO;
}

export interface ProductItemDTO extends ProductItems {
  Product: Products;
  Size: PizzaSizes | null;
}

export interface OrderDTO {
  id: number;
  date: string;
  updatedAt: string;
  address: string;
  total: number;
  items: OrderItemDTO[];
  points: number;
  status: 'PENDING' | 'SUCCEEDED' | 'CANCELLED';
}
