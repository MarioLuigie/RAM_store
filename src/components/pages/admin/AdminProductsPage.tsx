import { requireAdmin } from '@/lib/utils/auth-guard';
import { getProducts } from '@/lib/actions/product.actions';

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
	console.log(page, query, category);

	const {
		success,
		data,
	} = await getProducts({
		page,
		query,
		category,
	});

	console.log("DATA", data!.products, data!.totalPages)

	await requireAdmin();
	return (
		<div className="space-y-2">
			<div className="flex-between">
				<h1 className="text-xl  mb-3">Products</h1>
			</div>
		</div>
	);
}
