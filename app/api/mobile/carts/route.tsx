import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { CreateCartItemValues } from '@/shered/services/dto/cart.dto';
import { updateCartTotalAmount } from '@/shered/lib/update-cart-total-amount';
import { verifyToken } from '@/shered/lib/verify-token';

export async function GET(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Необходима авторизация' },
        { status: 401 }
      );
    }

    const userId = Number(decoded.id);

    const cart = await prisma.carts.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            productItem: {
              include: {
                Product: {
                  select: {
                    ID_Product: true,
                    name: true,
                    imageUrl: true,
                    description: true,
                  },
                },
                Size: {
                  select: {
                    ID_Size: true,
                    Size_name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!cart) {
      return NextResponse.json({
        id: -1,
        totalAmount: 0,
        items: [],
      });
    }

    const formattedCart = {
      id: cart.id,
      totalAmount: cart.totalAmount,
      items: cart.items.map((item) => ({
        id: item.id,
        cartId: item.cartId,
        productItemId: item.productItemId,
        quantity: item.quantity,
        price: item.productItem.Price,
        name: item.productItem.Product.name,
        imageUrl: item.productItem.Product.imageUrl,
        pizzaSize: item.productItem.Size?.Size_name || null,
        description: item.productItem.Product.description || null,
      })),
    };

    return NextResponse.json(formattedCart, { status: 200 });
  } catch (error) {
    console.error('[CARTS_GET] Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Необходима авторизация' },
        { status: 401 }
      );
    }

    const userId = Number(decoded.id);

    let userCart = await prisma.carts.findFirst({
      where: { userId },
    });

    if (!userCart) {
      userCart = await prisma.carts.create({
        data: {
          userId,
          totalAmount: 0,
        },
      });
    }

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItems.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
    });

    if (findCartItem) {
      await prisma.cartItems.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItems.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(undefined, userId);

    const cartWithDetails = await prisma.carts.findFirst({
      where: { id: updatedUserCart.id },
      include: {
        items: {
          include: {
            productItem: {
              include: {
                Product: {
                  select: {
                    ID_Product: true,
                    name: true,
                    imageUrl: true,
                    description: true,
                  },
                },
                Size: {
                  select: {
                    ID_Size: true,
                    Size_name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const formattedCart = {
      id: cartWithDetails!.id,
      totalAmount: cartWithDetails!.totalAmount,
      items: cartWithDetails!.items.map((item) => ({
        id: item.id,
        cartId: item.cartId,
        productItemId: item.productItemId,
        quantity: item.quantity,
        price: item.productItem.Price,
        name: item.productItem.Product.name,
        imageUrl: item.productItem.Product.imageUrl,
        pizzaSize: item.productItem.Size?.Size_name || null,
        description: item.productItem.Product.description || null,
      })),
    };

    return NextResponse.json(formattedCart, { status: 200 });
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json(
      { message: 'Не удалось добавить товар в корзину' },
      { status: 500 }
    );
  }
}
