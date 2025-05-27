import { cn } from '../../lib/utils';
import React from 'react';
import { Container } from './container';
import { Categories } from './categories';
import { ProductCategories } from '@prisma/client';
import { Button } from '../ui/button';
import { CartDrawer } from './card-drawer';
import { CartButton } from './cart-button';

interface Props {
  categories: ProductCategories[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div className={cn('sticky top-0 bg-main py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className="flex items-center justify-between ">
        <Categories items={categories} />
        <CartButton/>
      </Container>
    </div>
  );
};
