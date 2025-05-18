// modules
import { Metadata } from 'next';
// lib
import { APP_ROUTE_NAME_ORDERS } from '@/lib/constants';
// components
import OrdersPage from '@/components/pages/OrdersPage';

export const metadata: Metadata = {
	title: `My ${APP_ROUTE_NAME_ORDERS}`,
};

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ page: string }>
}) {
	const { page } = await searchParams;

	return <OrdersPage page={page} />;
}
