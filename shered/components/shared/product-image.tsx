'use client';

import { PizzaSizes } from '@prisma/client';
import { cn } from '../../lib/utils';
import React from 'react';

interface Props {
  className?: string;
  imageUrl: string;
  size?: PizzaSizes | null;
}

export const PizzaImage: React.FC<Props> = ({ imageUrl, size, className }) => {
  return (
    <div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>
      <img
        src={imageUrl}
        alt="Logo"
        className={cn('relative left-2 top-2 transition-all z-10 duration-300', {
          'w-[250px] h-[250px]': size?.Size_name === '25',
          'w-[300px] h-[300px]': size?.Size_name === '30',
          'w-[350px] h-[350px]': size?.Size_name === '35',
        })}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-300 w-[320px] h-[320px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-200 w-[270px] h-[270px]" />
    </div>
  );
};