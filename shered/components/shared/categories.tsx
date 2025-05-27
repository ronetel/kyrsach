'use client';

import { cn } from '../../lib/utils';
import { useCategoryStore } from '../../store/category';
import { ProductCategories } from '@prisma/client';
import React from 'react';

interface Props {
  items: ProductCategories[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn('inline-flex gap-1 bg-mint-500 p-1 rounded-2xl', className)}>
      {items.map(({ Name_categry, ID_Category }, index) => (
        <a
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === ID_Category && 'bg-main shadow-md',
          )}
          href={`/#${Name_categry}`}
          key={index}>
          <p>{Name_categry}</p>
        </a>
      ))}
    </div>
  );
};
