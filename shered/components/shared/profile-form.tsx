'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { formRegisterSchema } from './modals/auth-modal/forms/schemas';
import { Users } from '@prisma/client';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container } from './container';
import { Titles } from './title';
import { FormInput } from './form';
import { Button } from '../ui/button';
import { updateUserInfo } from '@/app/actions';
import { z } from 'zod';
import { OrderHistory } from './order-history';

const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
  email: z.string().email({ message: 'Введите корректную почту' }),
  password: z.string().min(4, { message: 'Введите корректный пароль' }).optional().or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal('')),
}).refine((data) => {
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface Props {
  data: Users;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: data.Name_user,
      email: data.Email_user,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    try {
      const updateData: {
        Email_user: string;
        Name_user: string;
        Password_user?: string;
      } = {
        Email_user: data.email,
        Name_user: data.fullName,
      };
      
      if (data.password) {
        updateData.Password_user = data.password;
      }

      await updateUserInfo(updateData);

      toast.success('Данные обновлены 📝', {
        icon: '✅',
      });
    } catch (error) {
      toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Container className="my-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Titles text='Личные данные' size="md" className="font-bold" />

      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />

          <FormInput 
            type="password" 
            name="password" 
            label="Новый пароль" 
          />
          <FormInput 
            type="password" 
            name="confirmPassword" 
            label="Повторите пароль" 
          />

          <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button">
            Выйти
          </Button>
        </form>
      </FormProvider>
        </div>

        <div>
          <Titles text="История заказов" size="md" className="font-bold mb-6" />
          <OrderHistory />
        </div>
      </div>
    </Container>
  );
};