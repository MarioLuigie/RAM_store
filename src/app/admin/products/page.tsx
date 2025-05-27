// modules
import { Metadata } from 'next'; // components
import AdminProductsPage from '@/components/pages/admin/AdminProductsPage';
import { APP_ROUTE_NAME_PRODUCTS } from '@/lib/constants';

export const metadata: Metadata = {
	title: `Admin ${APP_ROUTE_NAME_PRODUCTS}`,
};

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{
		page: string;
		query: string;
		category: string;
	}>;
}) {
	const { page, query, category } = await searchParams;
	return (
		<AdminProductsPage
			page={Number(page) || 1}
			query={query || ''}
			category={category || ''}
		/>
	);
}
