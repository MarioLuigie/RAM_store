import { requireAdmin } from '@/lib/utils/auth-guard';
import { getAllOrders } from '@/lib/actions/order.actions';
import AdminOrdersTable from '@/components/tables/AdminOrdersTable';
import Pagination from '@/components/shared/Pagination';
import FilteredBy from '@/components/content/FilteredBy';
import { ROUTES } from '@/lib/constants/paths';

export default async function AdminOrdersPage({
	page = '1',
	query,
}: {
	page: string;
	query: string;
}) {
	await requireAdmin();

	const { success, data } = await getAllOrders({
		limit: 6,
		page: Number(page),
		query: query,
	});

	if (!success || !data || !data.orders) {
		return (
			<div>
				<h2 className="text-xl  mb-3">Admin Orders</h2>
				<p className="text-center">Orders not found</p>
			</div>
		);
	}

	return (
		<>
			<div className="flex items-end gap-2 mb-3">
				<h2 className="text-xl">Orders</h2>
				{query && (
					<FilteredBy query={query} redirect={ROUTES.ADMIN_ORDERS} />
				)}
			</div>
			<AdminOrdersTable orders={data.orders} />
			{data.totalPages > 1 && (
				<Pagination page={Number(page) || 1} totalPages={data.totalPages} />
			)}
		</>
	);
}
