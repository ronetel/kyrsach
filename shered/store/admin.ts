import { create } from 'zustand';
import toast from 'react-hot-toast';
import { Api } from '@/shered/services/api-client';
import {
  CategoryDTO,
  SizeDTO,
  ProductDTO,
  OrderDTO,
  AddProductDTO,
} from '@/shered/services/dto/admin.dto';
import { getUserSession } from '../lib/get-user-session';
import { redirect } from 'next/navigation';
import { prisma } from '@/prisma/prisma-client';

export interface AdminState {
  categories: CategoryDTO[];
  sizes: SizeDTO[];
  products: ProductDTO[];
  orders: OrderDTO[];
  loading: boolean;
  error: boolean;

  fetchAdminData: () => Promise<void>;
  IsAdminData: () => Promise<void>;
  updateOrderStatus: (
    orderId: number,
    status: 'PENDING' | 'SUCCEEDED' | 'CANCELLED'
  ) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
  addProduct: (productData: AddProductDTO) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  categories: [],
  sizes: [],
  products: [],
  orders: [],
  loading: true,
  error: false,
  IsAdminData: async () => {
    const session = await getUserSession();

    if (!session) {
      return redirect('/not-auth');
    }

    const user = await prisma.users.findFirst({
      where: { ID_User: Number(session.id) },
    });

    if (!user || user.role !== 'Admin') {
      return redirect('/not-auth');
    }
  },

  fetchAdminData: async () => {
    try {
      set({ loading: true, error: false });
      const [categories, sizes, products, orders] = await Promise.all([
        Api.admin.getCategories(),
        Api.admin.getSizes(),
        Api.admin.getProducts(),
        Api.admin.getOrders(),
      ]);

      set({
        categories,
        sizes,
        products,
        orders,
      });
    } catch (error) {
      console.error('Fetch admin data error:', error);
      set({ error: true });
      toast.error('Ошибка загрузки данных', { icon: '❌' });
    } finally {
      set({ loading: false });
    }
  },

  updateOrderStatus: async (
    orderId: number,
    status: 'PENDING' | 'SUCCEEDED' | 'CANCELLED'
  ) => {
    try {
      set({ loading: true, error: false });
      const updatedOrder = await Api.admin.updateOrderStatus(orderId, {
        status,
      });
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        ),
      }));
      toast.success('Статус заказа обновлён', { icon: '✅' });
    } catch (error) {
      console.error('Update order status error:', error);
      set({ error: true });
      toast.error('Не удалось обновить статус', { icon: '❌' });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (productId: number) => {
    try {
      set({ loading: true, error: false });
      await Api.admin.deleteProduct(productId);
      set((state) => ({
        products: state.products.filter((p) => p.ID_Product !== productId),
      }));
      toast.success('Товар удалён', { icon: '✅' });
    } catch (error) {
      console.error('Delete product error:', error);
      set({ error: true });
      toast.error('Не удалось удалить товар', { icon: '❌' });
    } finally {
      set({ loading: false });
    }
  },

  addProduct: async (productData: AddProductDTO) => {
    try {
      set({ loading: true, error: false });
      const newProduct = await Api.admin.addProduct(productData);
      set((state) => ({
        products: [newProduct, ...state.products],
      }));
      toast.success('Товар добавлен', { icon: '✅' });
    } catch (error) {
      console.error('Add product error:', error);
      set({ error: true });
      toast.error('Не удалось добавить товар', { icon: '❌' });
    } finally {
      set({ loading: false });
    }
  },
}));
