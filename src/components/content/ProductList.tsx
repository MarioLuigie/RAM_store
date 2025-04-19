import { Product } from '@/lib/types/products'

export default function ProductList({ data }: { data: Product[] }) {
	return (
		<>
			{data.map((product, i) => (
				<div key={i}>{product.name}</div>
			))}
		</>
	)
}
