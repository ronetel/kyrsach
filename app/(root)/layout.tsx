import { Metadata } from 'next';
import '../global.css';
import Header from '@/shered/components/shared/header';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Green Bite | Главная',
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        <Header />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
