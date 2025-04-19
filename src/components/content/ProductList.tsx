import { Product } from '@/lib/types/products'

export default function ProductList({ data }: { data: Product[] }) {
	const numberOfProducts = data.length
	return (
		<>
			{numberOfProducts > 0 ? (
				<div>
					{data.map((product, i) => (
						<div key={i}>{product.name}</div>
					))}
				</div>
			) : (
				<div>
					<p>No products...</p>
				</div>
			)}
		</>
	)
}
