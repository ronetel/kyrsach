import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/prisma/prisma-client';
import { compare, hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Credentials received:', credentials);
        if (!credentials) {
          console.log('No credentials provided');
          return null;
        }

        const findUser = await prisma.users.findFirst({
          where: {
            Email_user: credentials.email,
          },
        });

        if (!findUser) {
          console.log('User not found:', credentials.email);
          return null;
        }

        console.log('User found:', findUser);

        const isPasswordValid = await compare(
          credentials.password,
          findUser.Password_user
        );

        if (!isPasswordValid) {
          console.log('Invalid password for user:', credentials.email);
          return null;
        }

        if (!findUser.verified) {
          console.log('User not verified:', credentials.email);
          return null;
        }

        const token = jwt.sign(
          { id: findUser.ID_User, email: findUser.Email_user },
          process.env.JWT_SECRET || ''
        );

        console.log('Authentication successful, token generated');
        return {
          id: findUser.ID_User,
          email: findUser.Email_user,
          name: findUser.Name_user,
          role: findUser.role,
          accessToken: token,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'credentials' && user.id && user.token) {
          const response = await fetch('/api/merge-cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: Number(user.id),
              cartToken: user.token,
            }),
          });

          if (!response.ok) {
            console.error('Failed to merge cart:', await response.text());
          }
        }

        if (!user.email) {
          return false;
        }

        const findUser = await prisma.users.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId
                  ? String(account.providerAccountId)
                  : null, // Преобразуем в строку
              },
              { Email_user: user.email },
            ],
          },
        });

        if (findUser) {
          await prisma.users.update({
            where: {
              ID_User: findUser.ID_User,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId
                ? String(account.providerAccountId)
                : null, // Преобразуем в строку
            },
          });

          if (account?.provider === 'google' && user.id && user.token) {
            const response = await fetch('/api/merge-cart', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: Number(user.id),
                cartToken: user.token,
              }),
            });

            if (!response.ok) {
              console.error('Failed to merge cart:', await response.text());
            }
          }
          return true;
        }

        const newUser = await prisma.users.create({
          data: {
            Email_user: user.email,
            Name_user: user.name || 'User #' + user.id,
            Password_user: hashSync(user.email, 10),
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId
              ? String(account.providerAccountId)
              : null, // Преобразуем в строку
          },
        });

        if (account?.provider === 'google' && newUser.ID_User && user.token) {
          const response = await fetch('/api/merge-cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: newUser.ID_User,
              cartToken: user.token,
            }),
          });

          if (!response.ok) {
            console.error('Failed to merge cart:', await response.text());
          }
        }
        return true;
      } catch (error) {
        console.error('Error [SIGNIN]', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = Number(user.id);
        token.email = user.email;
        token.fullName = user.name;
        token.role = user.role;
        token.token = user.token;
      }

      if (!token.email) {
        return token;
      }

      const findUser = await prisma.users.findFirst({
        where: {
          Email_user: token.email,
        },
      });

      if (findUser) {
        token.id = findUser.ID_User;
        token.email = findUser.Email_user;
        token.fullName = findUser.Name_user;
        token.role = findUser.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = Number(token.id);
        session.user.role = token.role;
        session.user.token = token.token;
      }
      return session;
    },
  },
};
