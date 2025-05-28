import { authOptions } from '@/shered/constants/auth-options';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import NextCors from 'nextjs-cors';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  return NextAuth(req, res, authOptions);
}
