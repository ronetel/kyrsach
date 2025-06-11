'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/shered/components/ui/button';
import { useAdminStore } from '@/shered/store/admin';
import AddUserForm from '@/shered/components/shared/admin-add-user';

export default function AddUserPage() {
  const { loading, fetchAdminData } = useAdminStore();

  useEffect(() => {
    fetchAdminData(true);
  }, [fetchAdminData]);

  if (loading) {
    return <div className="text-white text-center mt-10">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-main text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Добавить пользователя</h1>
        <Link href="/admin/users">
          <Button variant="red">Назад</Button>
        </Link>
      </div>
      <div className="max-w-2xl mx-auto">
        <AddUserForm />
      </div>
    </div>
  );
}
