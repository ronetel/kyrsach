'use client';

import { ProductItems, PizzaSizes } from '@prisma/client';
import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { PizzaImage } from './product-image';
import { Titles } from './title';
import { useCartStore } from '../../store/cart';

interface Props {
  imageUrl: string;
  name: string;
  desc: string;
  items: (ProductItems & { Size: PizzaSizes | null })[];
  className?: string;
  loading?: boolean;
  onSubmit: (itemId: number) => void;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  desc,
  imageUrl,
  className,
  loading,
  onSubmit,
}) => {
  const [selectedItemId, setSelectedItemId] = React.useState(items[0]?.Id);
  const selectedItem = items.find(item => item.Id === selectedItemId) || items[0];

  const handleClickAdd = async () => {
    if(selectedItem){
      onSubmit(selectedItem.Id)
    }
  };

  return (
    <div className={cn(className, 'flex flex-col md:flex-row bg-dop-bg min-h-[500px] max-h-[700px]')}>
      <div className="md:w-2/4 bg-dop-bg flex items-center justify-center p-4">
        <PizzaImage
          imageUrl={imageUrl}
          size={selectedItem.Size }
          className="w-full h-full max-h-[400px] md:max-h-none"
        />
      </div>

      <div className="md:w-2/4 bg-main p-6 flex flex-col h-full overflow-y-auto">
        <Titles
          text={name}
          size="lg"
          className="font-extrabold mb-3 "
        />

        <p className="text-dop-bg mb-6 text-lg">{desc}</p>
        <div className={cn(className, 'flex justify-between bg-mint-500 rounded-3xl p-1 select-none')}>
              {items.map((item) => (
                <button
                  key={item.Id}
                  onClick={() => setSelectedItemId?.(item.Id)}
                  className={cn(
                    'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
                    selectedItemId === item.Id
                      ? 'bg-main border-dop-bg'
                      : 'bg-mint-500 border-dop-bg'
                  )}>
                  {item.Size?.Size_name } см
                </button>
              ))}
            </div>

        <div className="mt-auto pt-4">
          <Button
            className="w-full h-14 text-md rounded-lg"
            size="lg"
            onClick={handleClickAdd}
          >
            Добавить в корзину за {selectedItem.Price} ₽
          </Button>
        </div>
      </div>
    </div>
  );
};