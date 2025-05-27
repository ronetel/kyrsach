import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/shered/lib/get-user-session';
import { redirect } from 'next/navigation';
import AdminPanel from '@/shered/components/shared/admin-panel';

export default async function AdminPage() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/not-auth');
  }

  const user = await prisma.users.findFirst({
    where: { ID_User: Number(session.id) },
  });

  if (!user || user.role !== 'Admin') {
    return redirect('/not-auth');
  }
  return <AdminPanel />;
}
