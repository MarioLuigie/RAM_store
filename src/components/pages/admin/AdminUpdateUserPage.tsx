// lib
import { requireAdmin } from '@/lib/utils/auth-guard';
import { notFound } from 'next/navigation';
import { getUserById } from '@/lib/actions/user.actions';
import UserRoleBadge from '@/components/shared/UserRoleBadge';
import { AuthRole } from '@/lib/constants/enums';

export default async function AdminUpdateUserPage({ userId }: { userId: string }) {
  await requireAdmin();

  const { success, data } = await getUserById(userId);

  if (!success || !data) notFound();

  return (
    <div className='flex gap-2 items-center mb-3'>
      <h2 className="text-xl ">Updating {data.name}</h2>
      {/* <dev>CHANGE AUTHROLE TYPE FORCE - DANGEROUS - TEMPORARY SOLUTION ! */}
      <UserRoleBadge userRole={data.role as AuthRole} />
    </div>
  );
}
