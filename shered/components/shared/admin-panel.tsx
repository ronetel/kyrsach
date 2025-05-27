'use client';

import React, { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import OrderList from '@/shered/components/shared/admin-order-list';
import { Button } from '@/shered/components/ui/button';
import { useAdminStore } from '@/shered/store/admin';

const AdminPanel: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    products,
    orders,
    loading,
    fetchAdminData,
    updateOrderStatus,
    deleteProduct,
  } = useAdminStore();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || session.user.role !== 'Admin') {
      router.push('/');
      toast.error('Доступ запрещён', { icon: '❌' });
      return;
    }

    fetchAdminData();
  }, [session, status, router, fetchAdminData]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  if (status === 'loading' || loading) {
    return <div className="text-white text-center mt-10">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-main text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Панель администратора</h1>
        <Button variant="red" onClick={handleSignOut}>
          Выйти
        </Button>
      </div>
      <div className="mb-6">
        <Link href="/admin/add-product">
          <Button variant="red">Добавить товар</Button>
        </Link>
      </div>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Список товаров</h2>
        {products.length === 0 ? (
          <p>Товары отсутствуют.</p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.ID_Product}
                className="bg-[#3A2B2B] p-4 rounded-lg shadow-lg flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold">{product.name}</p>
                  <p>
                    Категория:{' '}
                    {product.Category?.Name_categry || 'Без категории'}
                  </p>
                </div>
                <div>
                  <Button
                    onClick={() => deleteProduct(product.ID_Product)}
                    variant="red"
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="mt-10">
        <OrderList orders={orders} onUpdateOrderStatus={updateOrderStatus} />
      </section>
    </div>
  );
};

export default AdminPanel;
