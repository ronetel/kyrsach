import { Users } from '@prisma/client';
import { axiosInstance } from './instance';

export const getMe = async () => {
  const { data } = await axiosInstance.get<Users>('api/auth/me');

  return data;
};
