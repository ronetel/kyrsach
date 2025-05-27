import React from 'react';
import { Titles } from './title';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

interface Props {
  imageUrl: string;
  name: string;
  desc: string;
  price: number;
  loading?: boolean;
  onSubmit?: () => Promise<void> | void;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  desc,
  imageUrl,
  price,
  onSubmit,
  className,
  loading,
}) => {

  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center bg-dop-bg flex-1 relative 'min-h-[500px] max-h-[700px]'">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bg-main p-7">
        <Titles text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-dop-bg mb-6 text-mb">{desc}</p>
        <Button
          onClick={() => onSubmit?.()}
          disabled={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
            Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};