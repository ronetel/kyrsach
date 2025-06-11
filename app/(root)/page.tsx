import { prisma } from '../../prisma/prisma-client';
import { TopBar } from '../../shered/components/shared/top-bar';
import { ProductsGroupList } from '../../shered/components/shared/products-group-list';
import { Container } from '../../shered/components/shared/container';
import { Stories } from '@/shered/components/shared/stories';

export default async function Home() {
  const categories = await prisma.productCategories.findMany({
    include: {
      Products: {
        include: {
          ProductItems: true,
        },
      },
    },
  });

  return (
    <>
      <Stories />

      <TopBar
        categories={categories.filter(
          (category) => category.Products.length > 0
        )}
      />

      <Container className="mt-10 pb-14">
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            {categories.map(
              (category) =>
                category.Products.length > 0 && (
                  <ProductsGroupList
                    key={category.ID_Category}
                    title={category.Name_categry}
                    categoryId={category.ID_Category}
                    items={category.Products}
                  />
                )
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
