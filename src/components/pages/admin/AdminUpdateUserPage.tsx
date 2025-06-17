// lib
import { requireAdmin } from '@/lib/utils/auth-guard';

export default async function AdminUpdateUserPage({ userId }: { userId: string }) {
  await requireAdmin();

  return (
    <>
      <h2 className="text-xl  mb-3">User {userId}</h2>
    </>
  );
}
