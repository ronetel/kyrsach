'use client';

import React, { useCallback } from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';
import { ProductWithRelations } from '../../../@types/prisma';
import { useCartStore } from '../../store/cart';

interface Props {
    product: ProductWithRelations;
    onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
    const addCartItem = useCartStore((state) => state.addCartItem);
    const loading = useCartStore((state) => state.loading);

    const firstItem = product.ProductItems[0];
    const isPizzaForm = Boolean(firstItem?.Size);

    const onSubmit = useCallback(async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.Id;

            await addCartItem({
                productItemId: itemId,
            });

            toast.success(`${product.name} добавлен(а) в корзину`);
            _onSubmit?.();
        } catch (err) {
            toast.error('Не удалось добавить товар в корзину');
            console.error(err);
        }
    }, [addCartItem, firstItem?.Id, product.name, _onSubmit]);

    if (isPizzaForm) {
        return (
            <ChoosePizzaForm
                imageUrl={product.imageUrl || ''}
                name={product.name}
                desc={product.description || ''}
                items={product.ProductItems}
                onSubmit={onSubmit}
            />
        );
    }

    return (
        <ChooseProductForm
            imageUrl={product.imageUrl || ''}
            name={product.name}
            desc={product.description || ''}
            onSubmit={onSubmit}
            price={firstItem.Price}
            loading={loading}
        />
    );
};