import { prisma } from '@/prisma/prisma-client';
import { ProfileForm } from '@/shered/components/shared/profile-form';
import { getUserSession } from '@/shered/lib/get-user-session';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/not-auth');
  }

  const user = await prisma.users.findFirst({ where: { ID_User: Number(session?.id) } });

  if (!user) {
    return redirect('/not-auth');
  }

  return <ProfileForm data={user} />;
}
