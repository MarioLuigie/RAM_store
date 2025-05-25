// modules
import { notFound } from 'next/navigation';
// lib
import { getOrderById } from '@/lib/actions/order.actions';
// componnets
import OrderDetails from '@/components/content/OrderDetails';
import { ShippingAddress } from '@/lib/types/shipping.types';
import { checkIsAdmin } from '@/lib/utils/server';

export default async function OrderDetailsPage({
	orderId,
}: {
	orderId: string;
}) {
	const { data: order } = await getOrderById(orderId);

	if (!order) notFound();

	const isAdmin = await checkIsAdmin();

	return (
		<>
			<OrderDetails
				order={{
					...order,
					shippingAddress: order.shippingAddress as ShippingAddress,
				}}
				paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
				isAdmin={isAdmin}
			/>
		</>
	);
}
