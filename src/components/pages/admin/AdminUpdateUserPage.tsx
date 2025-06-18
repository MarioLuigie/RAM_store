// lib
import { requireAdmin } from '@/lib/utils/auth-guard';
import { notFound } from 'next/navigation';
import { getUserById } from '@/lib/actions/user.actions';
import UserRoleBadge from '@/components/shared/UserRoleBadge';
import { AuthRole } from '@/lib/constants/enums';
import AdminUpdateUserForm from '@/components/forms/AdminUpdateUserForm';

export default async function AdminUpdateUserPage({
	userId,
}: {
	userId: string;
}) {
	await requireAdmin();

	const { success, data: user } = await getUserById(userId);

	if (!success || !user) notFound();

	return (
		<>
			<div className="flex gap-2 items-center mb-3">
				<h2 className="text-xl ">Update {user.name}</h2>
				{/* <dev>CHANGE AUTHROLE TYPE FORCE - DANGEROUS - TEMPORARY SOLUTION ! */}
				<UserRoleBadge userRole={user.role as AuthRole} />
			</div>

			<div className='w-full flex justify-center mt-12'>
        <AdminUpdateUserForm user={user} />
      </div>
		</>
	);
}
