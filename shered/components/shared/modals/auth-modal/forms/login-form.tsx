import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TFormLoginValues, formLoginSchema } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Titles } from '../../../title';
import { FormInput } from '../../../form';
import toast from 'react-hot-toast';
import { signIn, useSession, getSession } from 'next-auth/react';
import { Button } from '../../../../ui/button';
import { useRouter } from 'next/navigation';

interface Props {
  onClose?: VoidFunction;
  onLoginSuccess?: () => void;
}

export const LoginForm: React.FC<Props> = ({ onClose, onLoginSuccess }) => {
  const router = useRouter();
  const { update, data: session } = useSession();
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw new Error(resp?.error || 'Login failed');
      }

      await update();

      const updatedSession = await getSession();

      if (updatedSession?.user?.role === 'Admin') {
        router.push('/admin');
        return;
      }

      toast.success('Вы успешно вошли в аккаунт', {
        icon: '✅',
      });
      onClose?.();
      onLoginSuccess?.();
      router.refresh();
    } catch (error) {
      console.error('Error [LOGIN]', error);
      toast.error('Не удалось войти в аккаунт', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Titles text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              Введите свою почту, чтобы войти в свой аккаунт
            </p>
          </div>
          <img
            src="/assets/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button
          variant="red"
          loading={form.formState.isSubmitting}
          className="h-12 text-base text-white"
          type="submit"
        >
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
