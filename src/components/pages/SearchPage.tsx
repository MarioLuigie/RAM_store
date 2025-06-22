// lib
import { getProducts } from '@/lib/actions/product.actions';

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
		<div>
			SEARCH PAGE{' '}
			{Object.values(queries).map((query, i) => (
				<p key={i}>{query}</p>
			))}
		</div>
	);
}
