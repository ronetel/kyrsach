'use client';

import React from 'react';
import { WhiteBlock } from './white-block';
import { ArrowRight, Package, Gift, Truck } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { CheckoutItemDetails } from './checkout-item-details';
import { Checkbox } from '../ui/checkbox';

const DELIVERY_PRICE = 250;
const LOYALTY_RATE = 0.05;

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
  loyaltyPoints: number;
  totalPrice: number;
  usePoints: boolean;
  setUsePoints: (value: boolean) => void;
  accountPoints: number;
  isAuthenticated: boolean;
}

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  loading,
  className,
  loyaltyPoints,
  totalPrice,
  usePoints,
  setUsePoints,
  accountPoints,
  isAuthenticated,
}) => {
  const finalTotalPrice = usePoints
    ? Math.max(totalPrice - accountPoints, 0)
    : totalPrice;

  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">
            {finalTotalPrice.toLocaleString()} ₽
          </span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость корзины:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${totalAmount.toLocaleString()} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Gift size={18} className="mr-2 text-gray-400" />
            Бонусы за заказ:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${loyaltyPoints} баллов`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${DELIVERY_PRICE} ₽`
          )
        }
      />

      {isAuthenticated && accountPoints > 0 && (
        <div className="flex items-center mt-4">
          <Checkbox
            id="use-points"
            checked={usePoints}
            onCheckedChange={(checked) => setUsePoints(checked as boolean)}
            disabled={loading || accountPoints === 0}
          />
          <label htmlFor="use-points" className="ml-2 text-sm">
            Потратить {accountPoints} баллов аккаунта для оплаты
          </label>
        </div>
      )}

      <Button
        loading={loading}
        variant="red"
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold text-white"
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
