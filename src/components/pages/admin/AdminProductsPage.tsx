import { requireAdmin } from '@/lib/utils/auth-guard';
import { getProducts } from '@/lib/actions/product.actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/paths';
import { Plus } from 'lucide-react';
import AdminProductsTable from '@/components/tables/AdminProductsTable';
import Pagination from '@/components/shared/Pagination';

type AdminProductsPageProps = {
	page: number;
	query: string;
	category: string;
};

export default async function AdminProductsPage({
	page,
	query,
	category,
}: AdminProductsPageProps) {
	const { success, data } = await getProducts({
		page,
		query,
		category,
	});

	if (!success || !data) throw new Error('Products not found');

	await requireAdmin();
	return (
		<div className="space-y-2">
			<div className="flex-between">
				<h1 className="text-xl  mb-3">Products</h1>
				<Button asChild variant="default">
					<Link href={ROUTES.ADMIN_PRODUCTS_CREATE}>
						<Plus />
						Create
					</Link>
				</Button>
			</div>
			<AdminProductsTable products={data.products} />
			{data.totalPages > 1 && (
				<Pagination page={Number(page) || 1} totalPages={data.totalPages} />
			)}
		</div>
	);
}
