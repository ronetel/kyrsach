import { CartStateItem } from './get-cart-details';

export const calculateNewTotal = (
  items: CartStateItem[],
  updatedItemId: number,
  newQuantity: number
): number => {
  return items.reduce((total, item) => {
    if (item.id === updatedItemId) {
      return total + (item.price * newQuantity);
    }
    return total + (item.price * item.quantity); 
  }, 0);
};