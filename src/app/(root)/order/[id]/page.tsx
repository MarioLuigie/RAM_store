// modules
import { Metadata } from 'next';
// components
import OrderDetailsPage from '@/components/pages/OrderDetailsPage';

export const metadata: Metadata = {
	title: 'Order',
};

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<>
			<OrderDetailsPage orderId={id} />
		</>
	);
}
