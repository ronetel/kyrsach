'use client';

import { OrderDTO } from '@/shered/services/dto/admin.dto';
import React from 'react';

interface Props {
  orders: OrderDTO[];
  onUpdateOrderStatus: (
    orderId: number,
    newStatus: 'PENDING' | 'SUCCEEDED' | 'CANCELLED'
  ) => void;
}

const OrderList: React.FC<Props> = ({ orders, onUpdateOrderStatus }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Управление заказами</h2>
      {orders.length === 0 ? (
        <p>Заказы отсутствуют.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#3A2B2B] p-4 rounded-lg shadow-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">Заказ #{order.id}</p>
                  <p>Дата: {order.date}</p>
                  <p>Адрес: {order.address}</p>
                  <p>
                    Клиент: {order.user.Name_user} ({order.user.Email_user})
                  </p>
                  <p>Сумма: {order.total} ₽</p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) =>
                    onUpdateOrderStatus(
                      order.id,
                      e.target.value as 'PENDING' | 'SUCCEEDED' | 'CANCELLED'
                    )
                  }
                  className="p-2 bg-[#4A3B3B] text-white rounded h-12 text-md"
                >
                  <option value="PENDING">В ожидании</option>
                  <option value="SUCCEEDED">Выполнен</option>
                  <option value="CANCELLED">Отменён</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OrderList;
