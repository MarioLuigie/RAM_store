// modules
import { notFound } from 'next/navigation';
// lib
import { getOrderById } from '@/lib/actions/order.actions';
// componnets
import OrderDetails from '@/components/content/OrderDetails';
import { ShippingAddress } from '@/lib/types/shipping.types';

export default async function OrderDetailsPage({
	orderId,
}: {
	orderId: string;
}) {
	const { data: order } = await getOrderById(orderId);

	if (!order) notFound();

	return (
		<>
			<OrderDetails
				order={{
					...order,
					shippingAddress: order.shippingAddress as ShippingAddress,
				}}
			/>
		</>
	);
}
