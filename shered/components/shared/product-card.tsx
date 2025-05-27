import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { Titles } from './title';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center bg-dop-bg p-6 rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>

        <Titles text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <div className="flex justify-between items-center mt-4">
          <span className="text-[16px]">
            от <b>{price} ₽</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
