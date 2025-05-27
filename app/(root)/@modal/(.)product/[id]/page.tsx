import { ChooseProductModal } from '../../../../../shered/components/shared/modals/choose-product-modal';
import { prisma } from '../../../../../prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProductModalPage(
  props: { params: { id: string } } & { params: Promise<any> }
) {
  const { id } = await props.params;
  const product = await prisma.products.findUnique({
    where: {
      ID_Product: Number(id),
    },
    include: {
      ProductItems: {
        include: {
          Size: true,
        },
      },
      Category: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
