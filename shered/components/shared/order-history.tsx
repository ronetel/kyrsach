'use client';

import { OrderDTO } from '@/shered/services/dto/order.dto';
import { useEffect, useState } from 'react';

interface Props {
  className?: string;
}

export const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/orders');

        if (!response.ok) {
          throw new Error('Не удалось загрузить историю заказов');
        }

        const data = await response.json();
        setOrders(data);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'В обработке';
      case 'SUCCEEDED':
        return 'Выполнен';
      case 'CANCELLED':
        return 'Отменен';
      default:
        return status;
    }
  };

  if (loading) {
    return <div className="text-center py-8">Загрузка истории заказов...</div>;
  }
  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-dop-bg">Заказов еще не было</div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">Заказ #{order.id}</h3>
              <p className="text-sm text-gray-400">{order.date}</p>
              <p className="text-sm mt-1">{order.address}</p>
            </div>
            <div className="flex flex-col items-end">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  order.status === 'SUCCEEDED'
                    ? 'bg-dop-bg text-green-800'
                    : order.status === 'CANCELLED'
                      ? 'bg-dop-bg text-red-800'
                      : 'bg-dop-bg text-yellow-800'
                }`}
              >
                {getStatusText(order.status)}
              </span>
              {order.points > 0 && (
                <span className="mt-1 text-xs text-mint-500">
                  +{order.points} баллов
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">
                      {item.productItem.Product.name}
                    </p>
                    <p className="font-medium">
                      {item.quantity * item.productItem.Price} ₽
                    </p>
                  </div>
                  {item.productItem.Size && (
                    <p className="text-sm text-gray-400">
                      Размер: {item.productItem.Size.Size_name}
                    </p>
                  )}
                  <p className="text-sm text-gray-400">
                    {item.quantity} × {item.productItem.Price} ₽
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t flex justify-between font-bold">
            <span>Итого:</span>
            <span>{order.total} ₽</span>
          </div>
        </div>
      ))}
    </div>
  );
};
