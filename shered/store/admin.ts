// @/shered/store/admin.ts
import { create } from 'zustand';
import toast from 'react-hot-toast';
import {
  getCategories,
  getSizes,
  getProducts,
  getOrders,
  updateOrderStatus,
  deleteProduct,
  addProduct,
  getCategoriesList,
  addCategory,
  deleteCategory,
  updateCategory,
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  getStories,
  addStory,
  deleteStory,
  updateStory,
} from '@/shered/services/admin';
import {
  CategoryDTO,
  SizeDTO,
  ProductDTO,
  OrderDTO,
  AddProductDTO,
  UserDTO,
  StoryDTO,
} from '@/shered/services/dto/admin.dto';
import { getUserSession } from '../lib/get-user-session';
import { redirect } from 'next/navigation';
import { prisma } from '@/prisma/prisma-client';

export interface AdminState {
  categories: CategoryDTO[];
  sizes: SizeDTO[];
  products: ProductDTO[];
  orders: OrderDTO[];
  users: UserDTO[];
  stories: StoryDTO[];
  loading: boolean;
  error: boolean;

  fetchAdminData: (initialLoad?: boolean) => Promise<void>;
  IsAdminData: () => Promise<void>;
  updateOrderStatus: (
    orderId: number,
    status: 'PENDING' | 'SUCCEEDED' | 'CANCELLED'
  ) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
  addProduct: (productData: AddProductDTO) => Promise<void>;
  deleteCategory: (categoryId: number) => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  updateCategory: (categoryId: number, name: string) => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;
  addUser: (userData: UserDTO) => Promise<void>;
  updateUser: (userId: number, userData: Partial<UserDTO>) => Promise<void>;
  deleteStory: (storyId: number) => Promise<void>;
  addStory: (storyData: {
    previewImageUrl: string;
    items: { sourceUrl: string }[];
  }) => Promise<void>;
  updateStory: (
    storyId: number,
    storyData: { previewImageUrl: string; items: { sourceUrl: string }[] }
  ) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  categories: [],
  sizes: [],
  products: [],
  orders: [],
  users: [],
  stories: [],
  loading: false,
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

  fetchAdminData: async (initialLoad = false) => {
    try {
      if (get().loading) return;
      set({ loading: true, error: false });

      if (initialLoad) {
        const [categories, sizes, products] = await Promise.all([
          getCategories(),
          getSizes(),
          getProducts(),
        ]);
        set({ categories, sizes, products });
      } else {
        const [categories, sizes, products, orders, users, stories] =
          await Promise.all([
            getCategories(),
            getSizes(),
            getProducts(),
            getOrders(),
            getUsers(),
            getStories(),
          ]);
        set({ categories, sizes, products, orders, users, stories });
      }
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
      const updatedOrder = await updateOrderStatus(orderId, { status });
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
      await deleteProduct(productId);
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
      const newProduct = await addProduct(productData);
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

  deleteCategory: async (categoryId: number) => {
    try {
      set({ loading: true, error: false });
      await deleteCategory(categoryId);
      set((state) => ({
        categories: state.categories.filter(
          (c) => c.ID_Category !== categoryId
        ),
      }));
      toast.success('Категория удалена', { icon: '✅' });
    } catch (error) {
      console.error('Delete category error:', error);
      set({ error: true });
      toast.error('Не удалось удалить категорию', { icon: '❌' });
    } finally {
      set({ loading: false });
    }
  },

  addCategory: async (name: string) => {
    try {
      set({ loading: true, error: false });
      const newCategory = await addCategory(name);
      set((state) => ({ categories: [newCategory, ...state.categories] }));
      toast.success('Категория добавлена', { icon: '✅' });
    } catch (error) {
      console.error('Add category error:', error);
      set({ error: true });
      toast.error('Не удалось добавить категорию', { icon: '❌' });
    } finally {
      set({ loading: false });
    }
  },

  updateCategory: async (categoryId: number, name: string) => {
    try {
      set({ loading: true, error: false });
      const updatedCategory = await updateCategory(categoryId, name);
      set((state) => ({
        categories: state.categories.map((c) =>
          c.ID_Category === categoryId ? updatedCategory : c
        ),
      }));
      toast.success('Категория обновлена', { icon: '✅' });
    } catch (error) {
      console.error('Update category error:', error);
      set({ error: true });
      toast.error('Не удалось обновить категорию', { icon: '❌' });
    } finally {
      set({ loading: false });
    }
  },

  deleteUser: async (userId: number) => {
    try {
      set({ loading: true, error: false });
      await deleteUser(userId);
      set((state) => ({
        users: state.users.filter((u) => u.ID_User !== userId),
      }));
      toast.success('Пользователь удалён', { icon: '✅' });
    } catch (error) {
      console.error('Delete user error:', error);
      set({ error: true });
      toast.error('Не удалось удалить пользователя', { icon: '❌' });
    } finally {
      set({ loading: false });
    }
  },

  addUser: async (userData: UserDTO) => {
    try {
      set({ loading: true, error: false });
      const newUser = await addUser(userData);
      set((state) => ({ users: [newUser, ...state.users] }));
      toast.success('Пользователь добавлен', { icon: '✅' });
    } catch (error) {
      console.error('Add user error:', error);
      set({ error: true });
      toast.error('Не удалось добавить пользователя', { icon: '❌' });
    } finally {
      set({ loading: false });
    }
  },

  updateUser: async (userId: number, userData: Partial<UserDTO>) => {
    try {
      set({ loading: true, error: false });
      const updatedUser = await updateUser(userId, userData);
      set((state) => ({
        users: state.users.map((u) => (u.ID_User === userId ? updatedUser : u)),
      }));
      toast.success('Пользователь обновлён', { icon: '✅' });
    } catch (error) {
      console.error('Update user error:', error);
      set({ error: true });
      toast.error('Не удалось обновить пользователя', { icon: '❌' });
    } finally {
      set({ loading: false });
    }
  },

  deleteStory: async (storyId: number) => {
    try {
      set({ loading: true, error: false });
      await deleteStory(storyId);
      set((state) => ({
        stories: state.stories.filter((s) => s.id !== storyId),
      }));
      toast.success('Сторис удалён', { icon: '✅' });
    } catch (error) {
      console.error('Delete story error:', error);
      set({ error: true });
      toast.error('Не удалось удалить сторис', { icon: '❌' });
    } finally {
      set({ loading: false });
    }
  },

  addStory: async (storyData: {
    previewImageUrl: string;
    items: { sourceUrl: string }[];
  }) => {
    try {
      set({ loading: true, error: false });
      const newStory = await addStory(storyData);
      set((state) => ({ stories: [newStory, ...state.stories] }));
      toast.success('Сторис добавлен', { icon: '✅' });
    } catch (error) {
      console.error('Add story error:', error);
      set({ error: true });
      toast.error('Не удалось добавить сторис', { icon: '❌' });
    } finally {
      set({ loading: false });
    }
  },

  updateStory: async (
    storyId: number,
    storyData: { previewImageUrl: string; items: { sourceUrl: string }[] }
  ) => {
    try {
      set({ loading: true, error: false });
      const updatedStory = await updateStory(storyId, storyData);
      set((state) => ({
        stories: state.stories.map((s) =>
          s.id === storyId ? updatedStory : s
        ),
      }));
      toast.success('Сторис обновлён', { icon: '✅' });
    } catch (error) {
      console.error('Update story error:', error);
      set({ error: true });
      toast.error('Не удалось обновить сторис', { icon: '❌' });
    } finally {
      set({ loading: false });
    }
  },
}));
