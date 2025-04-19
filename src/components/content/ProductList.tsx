import { Product } from '@/lib/types/products'

export default function ProductList({ data }: { data: Product[] }) {
	const numberOfProducts = data.length
	return (
		<>
			{numberOfProducts > 0 ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{data.map((product, i) => (
						<div key={i} className='bg-slate-300'>{product.name}</div>
					))}
				</div>
			) : (
				<div>
					<p>There are currently no products. Take a look a few moments later.</p>
				</div>
			)}
		</>
	)
}
