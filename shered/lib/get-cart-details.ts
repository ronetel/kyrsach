import { CartDTO } from '../services/dto/cart.dto';

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: string;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.Product.name,
    imageUrl: item.productItem.Product.imageUrl,
    price: item.productItem.Price,
    pizzaSize: item.productItem.Size?.Size_name || null,
    disabled: false,
  })) as CartStateItem[];

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
