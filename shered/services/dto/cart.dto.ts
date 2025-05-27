import { Carts, CartItems, Products, ProductItems, PizzaSizes } from '@prisma/client';

export type CartItemDTO = CartItems & {
  productItem: ProductItems & {
    Product: Products;
    Size: PizzaSizes | null;
  };
};

export interface CartDTO extends Carts {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productItemId: number;
  quantity?: number;
}

export interface UpdateCartItemValues {
  quantity: number;
}

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  return item.productItem.Price * item.quantity;
};