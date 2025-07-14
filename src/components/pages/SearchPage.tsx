// lib
import { getProducts } from '@/lib/actions/product.actions';
import ProductCard from '@/components/content/ProductCard';

type QueriesProps = {
	category: string;
	query: string;
	price: string;
	rating: string;
	sort: string;
	page: string;
};

export default async function SearchPage({
	queries,
}: {
	queries: QueriesProps;
}) {
	const { success, data } = await getProducts({
		category: queries.category,
		query: queries.query,
		page: Number(queries.page),
		price: queries.price,
		rating: queries.rating,
		sort: queries.sort,
	});

	if (!success || !data) throw new Error('Products not found');

	return (
		<div className="grid md:grid-cols-5 md:gap-5">
			<div className="filter-links">FILTERS</div>
			<div className="md:col-span-4 space-y-4">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{data.products.length === 0 && <p>No products found</p>}
					{data.products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
}
