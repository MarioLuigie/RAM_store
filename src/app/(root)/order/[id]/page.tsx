// modules
import { Metadata } from 'next';
// components
import OrderPage from '@/components/pages/OrderPage';

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
			<OrderPage />
			{id}
		</>
	);
}
