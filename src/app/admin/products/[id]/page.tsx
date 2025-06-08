import AdminUpdateProductPage from '@/components/pages/admin/AdminUpdateProductPage';
// modules
import { Metadata } from 'next';
// lib
import { APP_ROUTE_NAME_UPDATE_PRODUCT } from '@/lib/constants';

export const metadata: Metadata = {
	title: `Admin ${APP_ROUTE_NAME_UPDATE_PRODUCT}`,
};

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return <AdminUpdateProductPage productId={id} />;
}
