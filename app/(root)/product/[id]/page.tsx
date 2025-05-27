import { prisma } from '@/prisma/prisma-client';
import { Container } from '@/shered/components/shared/container';
import { ProductForm } from '@/shered/components/shared/product-form';
import { notFound } from 'next/navigation';

export default async function ProductPage(
  props: { params: { id: string } } & { params: Promise<any> }
) {
  const { id } = await props.params;
  const product = await prisma.products.findFirst({
    where: { ID_Product: Number(id) },
    include: {
      Category: {
        include: {
          Products: {
            include: {
              ProductItems: {
                include: { Size: true },
              },
            },
          },
        },
      },
      ProductItems: {
        include: { Size: true },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product} />
    </Container>
  );
}
