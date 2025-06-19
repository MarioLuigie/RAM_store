// lib
import { requireAdmin } from '@/lib/utils/auth-guard';
import { getUsers } from '@/lib/actions/user.actions';
// components
import AdminUsersTable from '@/components/tables/AdminUsersTable';
import Pagination from '@/components/shared/Pagination';
import FilteredBy from '@/components/content/FilteredBy';
import { ROUTES } from '@/lib/constants/paths';

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
			<div className="flex items-end gap-2 mb-3">
				<h2 className="text-xl">All Users</h2>
				{query && (
					<FilteredBy query={query} redirect={ROUTES.ADMIN_USERS} />
				)}
			</div>
			<AdminUsersTable users={data.users} />
			{data.totalPages > 1 && (
				<Pagination page={Number(page) || 1} totalPages={data.totalPages} />
			)}
		</>
	);
}
