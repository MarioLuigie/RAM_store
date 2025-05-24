// modules
import { Metadata } from 'next';
// lib
import { APP_ROUTE_NAME_ORDERS } from '@/lib/constants';
// components
import AdminOrdersPage from '@/components/pages/admin/AdminOrdersPage';

export const metadata: Metadata = {
	title: `Admin ${APP_ROUTE_NAME_ORDERS}`,
};

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;

	return <AdminOrdersPage page={page} />;
}
