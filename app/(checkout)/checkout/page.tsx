'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import React from 'react';
import { useSession } from 'next-auth/react';
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from '../../../shered/constants';
import { Api } from '../../../shered/services/api-client';
import { useCart } from '../../../shered/hooks/use-cart';
import { Container } from '../../../shered/components/shared/container';
import { Titles } from '../../../shered/components/shared/title';
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
} from '../../../shered/components/shared/checkout';
import { CheckoutSidebar } from '../../../shered/components/shared/checkout-sidebar';
import { createOrder } from '../../actions';

const DELIVERY_PRICE = 250;
const LOYALTY_RATE = 0.05;

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const [usePoints, setUsePoints] = React.useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();
  const { data: session } = useSession();
  const loyaltyPoints = Math.floor(totalAmount * LOYALTY_RATE);
  const totalPrice = totalAmount + DELIVERY_PRICE;

  const [accountPoints, setAccountPoints] = React.useState<number>(0);
  React.useEffect(() => {
    async function fetchUserPoints() {
      if (session?.user.id) {
        const data = await Api.auth.getMe();
        setAccountPoints(data.Points || 0);
      }
    }
    fetchUserPoints();
  }, [session]);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  React.useEffect(() => {
    async function fetchUserInfo() {
      if (session) {
        const data = await Api.auth.getMe();
        const [firstName, lastName] = data.Name_user.split(' ');

        form.setValue('firstName', firstName);
        form.setValue('lastName', lastName);
        form.setValue('email', data.Email_user);
      }
    }
    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const finalTotalPrice = usePoints
        ? Math.max(totalPrice - accountPoints, 0)
        : totalPrice;
      const url = await createOrder(
        data,
        loyaltyPoints,
        finalTotalPrice,
        usePoints,
        accountPoints
      );

      toast.success('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });

      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Titles
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Левая часть */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <CheckoutPersonalForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />

              <CheckoutAddressForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
            </div>

            {/* Правая часть */}
            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
                loyaltyPoints={loyaltyPoints}
                totalPrice={totalPrice}
                usePoints={usePoints}
                setUsePoints={setUsePoints}
                accountPoints={accountPoints}
                isAuthenticated={!!session}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
