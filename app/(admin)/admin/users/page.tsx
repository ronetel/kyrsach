'use client';

import React, { useEffect } from 'react';
import { useAdminStore } from '@/shered/store/admin';
import { Button } from '@/shered/components/ui/button';
import Link from 'next/link';

const UsersPage = () => {
  const { users, loading, fetchAdminData } = useAdminStore();

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  if (loading) {
    return <div className="text-white text-center mt-10">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-main text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Управление пользователями</h1>
        <Link href="/admin/users/add">
          <Button variant="red">Добавить пользователя</Button>
        </Link>
      </div>
      <div className="space-y-4">
        {users.length === 0 ? (
          <p>Пользователи отсутствуют.</p>
        ) : (
          users.map((user) => (
            <div
              key={user.ID_User}
              className="bg-[#3A2B2B] p-4 rounded-lg shadow-lg flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">{user.Name_user}</p>
                <p>Email: {user.Email_user}</p>
                <p>Роль: {user.role}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/users/edit/${user.ID_User}`}>
                  <Button variant="red">Редактировать</Button>
                </Link>
                <Button
                  variant="red"
                  onClick={() => {
                    /* TODO: Implement delete */
                  }}
                >
                  Удалить
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UsersPage;
