'use client';

import React, { useEffect } from 'react';
import { useAdminStore } from '@/shered/store/admin';
import OrderList from '@/shered/components/shared/admin-order-list';
import { Button } from '@/shered/components/ui/button';
import Link from 'next/link';

const OrdersPage = () => {
  const { orders, loading, fetchAdminData, updateOrderStatus } =
    useAdminStore();

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  if (loading) {
    return <div className="text-white text-center mt-10">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-main text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Управление заказами</h1>
        <Link href="/admin">
          <Button variant="red">Назад</Button>
        </Link>
      </div>
      <OrderList orders={orders} onUpdateOrderStatus={updateOrderStatus} />
    </div>
  );
};

export default OrdersPage;
