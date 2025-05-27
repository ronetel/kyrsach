'use client';

import React from 'react';
import { useIntersection } from 'react-use';
import { cn } from '../../lib/utils';
import { ProductCard } from './product-card';
import { useCategoryStore } from '../../store';
import { Titles } from './title';

interface Props {
  title: string;
  items: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef<HTMLDivElement>(null);

  const intersection = useIntersection(
    intersectionRef as React.RefObject<HTMLElement>,
    {
      threshold: 0.4,
    }
  );

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryId, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Titles text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.ID_Product}
            id={product.ID_Product}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.ProductItems[0]?.Price || 0}
          />
        ))}
      </div>
    </div>
  );
};
