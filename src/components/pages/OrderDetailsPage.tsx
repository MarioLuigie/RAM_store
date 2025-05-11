// modules
import { notFound } from 'next/navigation';
// lib
import { getOrderById } from '@/lib/actions/order.actions';

export default async function OrderDetailsPage({
	orderId,
}: {
	orderId: string;
}) {
	const { data: order } = await getOrderById(orderId);

	if (!order) notFound();

	return <div>ORDER DETAILS PAGE</div>;
}
