// lib
import { getOrders } from '@/lib/actions/order.actions';
import OrdersTable from '@/components/tables/OrdersTable';
import Pagination from '@/components/shared/Pagination';

export default async function OrdersPage({ page }: { page: string }) {
	const { success, data } = await getOrders({
		page: Number(page) || 1,
	});

	if (!success || !data || !data.orders) {
		return (
			<div>
				<h2 className="text-xl  mb-3">My Orders</h2>
				<p className="text-center">Orders not found</p>
			</div>
		);
	}

	return (
		<div>
			<h2 className="text-xl  mb-3">My Orders</h2>
			<OrdersTable orders={data.orders} />
			{data.totalPages > 1 && (
				<Pagination page={Number(page) || 1} totalPages={data.totalPages} />
			)}
		</div>
	);
}
