// lib
import { requireAdmin } from '@/lib/utils/auth-guard';
import { getUsers } from '@/lib/actions/user.actions';
// components
import AdminUsersTable from '@/components/tables/AdminUsersTable';
import Pagination from '@/components/shared/Pagination';

export default async function AdminUsersPage({
	page = '1',
	query,
}: {
	page: string;
	query: string;
}) {
	await requireAdmin();

	const { success, data } = await getUsers({ page: Number(page), query });

	if (!success || !data || !data.users) {
		return (
			<div>
				<h2 className="text-xl  mb-3">Admin Users</h2>
				<p className="text-center">Users not found</p>
			</div>
		);
	}

	return (
		<>
			<h2 className="text-xl  mb-3">All Users</h2>
			<AdminUsersTable users={data.users} />
			{data.totalPages > 1 && (
				<Pagination page={Number(page) || 1} totalPages={data.totalPages} />
			)}
		</>
	);
}
