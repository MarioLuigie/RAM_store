// lib
import { Product } from '@/lib/types/products'
// components
import ProductCard from '@/components/content/ProductCard'

export default function ProductList({ data }: { data: Product[] }) {
	const numberOfProducts = data.length
	return (
		<>
			{numberOfProducts > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
					{data.map((product: Product) => (
						<ProductCard product={product} key={product.slug} />
					))}
				</div>
			) : (
				<div>
					<p>
						There are currently no products. Take a look a few moments
						later.
					</p>
				</div>
			)}
		</>
	)
}
