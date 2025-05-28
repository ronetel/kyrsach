import { authOptions } from '@/shered/constants/auth-options';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ручная настройка CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // Для разработки
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Обработка preflight-запроса (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  return NextAuth(req, res, authOptions);
}
