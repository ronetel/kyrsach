'use client';

import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAdminStore } from '@/shered/store/admin';
import { Button } from '@/shered/components/ui/button';
import { UserDTO } from '@/shered/services/dto/admin.dto';

interface EditUserFormProps {
  userId: number;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ userId }) => {
  const { users, updateUser, fetchAdminData, loading } = useAdminStore();
  const form = useForm<UserDTO>({
    defaultValues: {
      ID_User: 0,
      Phone: '',
      Password_user: '',
      Name_user: '',
      Email_user: '',
      role: 'User',
      verified: undefined,
    },
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = form;

  const user = users.find((u) => u.ID_User === userId);

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const onSubmit = async (data: UserDTO) => {
    try {
      await updateUser(userId, data);
      await fetchAdminData();
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error);
    }
  };

  if (loading || !user) {
    return <div className="text-white text-center mt-10">Загрузка...</div>;
  }

  return (
    <section className="mb-10">
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#3A2B2B] p-6 rounded-lg shadow-lg space-y-6"
        >
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-500/20 p-3 rounded text-red-100">
              Исправьте ошибки:
              <ul className="list-disc list-inside mt-2">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <label
              htmlFor="Name_user"
              className="block text-sm font-medium mb-1"
            >
              Имя *
            </label>
            <input
              id="Name_user"
              type="text"
              {...register('Name_user', { required: 'Имя обязательно' })}
              className="w-full p-2 bg-[#4A3B3B] rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.Name_user && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Name_user.message as string}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="Email_user"
              className="block text-sm font-medium mb-1"
            >
              Email *
            </label>
            <input
              id="Email_user"
              type="email"
              {...register('Email_user', { required: 'Email обязателен' })}
              className="w-full p-2 bg-[#4A3B3B] rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.Email_user && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Email_user.message as string}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="Phone" className="block text-sm font-medium mb-1">
              Телефон
            </label>
            <input
              id="Phone"
              type="text"
              {...register('Phone')}
              className="w-full p-2 bg-[#4A3B3B] rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="Password_user"
              className="block text-sm font-medium mb-1"
            >
              Пароль
            </label>
            <input
              id="Password_user"
              type="password"
              {...register('Password_user')}
              className="w-full p-2 bg-[#4A3B3B] rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.Password_user && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Password_user.message as string}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Роль *
            </label>
            <select
              id="role"
              {...register('role', { required: 'Роль обязательна' })}
              className="w-full p-2 bg-[#4A3B3B] rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">
                {errors.role.message as string}
              </p>
            )}
          </div>
          <Button
            type="submit"
            variant="red"
            className="w-full mt-4 py-2"
            disabled={loading}
          >
            Сохранить
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default EditUserForm;
