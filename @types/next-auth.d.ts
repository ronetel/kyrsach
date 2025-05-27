import { DefaultSession } from 'next-auth';
import { Carts, UserRole } from '@prisma/client';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: number;
      role?: UserRole;
      name?: string;
      email?: string;
      image?: string;
      token?: string;
    };
    token?: string;
  }

  interface User {
    id: number;
    role?: UserRole;
    name?: string;
    email?: string;
    image?: string;
    token?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    role?: UserRole;
    email?: string;
    fullName?: string;
    token?: string;
  }
}
