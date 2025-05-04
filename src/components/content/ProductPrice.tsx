// lib
import { Product } from '@/lib/types/products.types'
import { formatCurrency } from '@/lib/utils/utils'

export default function ProductPrice({ product }: { product: Product }) {
	const price: string = formatCurrency(product.price)
	const stock: number = product.stock
	const [int, decimal] = price.split('.')

	return (
		<>
			{stock > 0 ? (
				<p>
					<span className="font-medium text-sm align-super">$</span>
					<span className="font-medium text-2xl">{int},</span>
					<span className="text-sm font-medium align-super">{decimal}</span>
				</p>
			) : (
				<p className="text-destructive font-medium">Out of stock</p>
			)}
		</>
	)
}
