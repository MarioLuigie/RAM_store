// modules
import { Metadata } from 'next';
// lib
import { APP_ROUTE_NAME_ORDERS } from '@/lib/constants';
// components
import OrdersPage from '@/components/pages/OrdersPage';

export const metadata: Metadata = {
	title: APP_ROUTE_NAME_ORDERS,
};

export default function Page() {
	return <OrdersPage />;
}
