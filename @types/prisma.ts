import { ProductItems, PizzaSizes, Products, ProductCategories } from '@prisma/client';

export type ProductWithRelations = Products & {
    ProductItems: (ProductItems & {
        Size: PizzaSizes | null;
    })[];
    Category: ProductCategories;
};