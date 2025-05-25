import { requireAdmin } from '@/lib/utils/auth-guard';
import { getAllOrders } from '@/lib/actions/order.actions';
import OrdersTable from '@/components/tables/OrdersTable';
import Pagination from '@/components/shared/Pagination';

export default async function AdminOrdersPage({
	page = '1',
}: {
	page: string;
}) {
	await requireAdmin();

	const { success, data } = await getAllOrders({
		limit: 6,
		page: Number(page),
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
			<OrdersTable orders={data.orders} />
			{data.totalPages > 1 && (
				<Pagination page={Number(page) || 1} totalPages={data.totalPages} />
			)}
		</>
	);
}
