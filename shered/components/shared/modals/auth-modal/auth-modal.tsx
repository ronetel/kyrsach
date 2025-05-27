'use client';

import { signIn } from 'next-auth/react';
import React from 'react';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';
import { Dialog, DialogContent } from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useCartStore } from '@/shered/store/cart';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<'login' | 'register'>('login');
  const { fetchCartItems } = useCartStore();

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTitle hidden>
        Авторизация
      </DialogTitle>
      <DialogContent className="w-[450px] bg-main p-10">
        {type === 'login' ? (
          <LoginForm onClose={handleClose} onLoginSuccess={fetchCartItems}/>
        ) : (
          <RegisterForm onClose={handleClose} />
        )}

        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            />
            Google
          </Button>
        </div>

        <Button onClick={onSwitchType} type="button" className="h-12">
          {type !== 'login' ? 'Вход' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
