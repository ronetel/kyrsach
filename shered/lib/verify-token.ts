import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as {
      id: number;
      email: string;
    };
    return decoded;
  } catch (error) {
    return null;
  }
};
