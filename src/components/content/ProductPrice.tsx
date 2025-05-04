import { Product } from '@/lib/types/products.types'
import { formatCurrencyParts } from '@/lib/utils/utils'

export default function ProductPrice({ product }: { product: Product }) {
	const stock: number = product.stock
	const { currency, integer, fraction, symbolFirst, literal } = formatCurrencyParts(product.price)

	if (stock <= 0) {
		return <p className="text-destructive font-medium">Out of stock</p>
	}

	return (
		<p>
			{symbolFirst && (
				<span className="font-medium text-sm align-super">{currency}</span>
			)}
			<span className="font-medium text-2xl">{integer}</span>
			{fraction && (
				<>
					<span className="text-2xl">{literal || ','}</span>
					<span className="text-sm font-medium align-super">{fraction}</span>
				</>
			)}
			{!symbolFirst && (
				<span className="font-medium text-sm align-super">{currency}</span>
			)}
		</p>
	)
}


// // lib
// import { Product } from '@/lib/types/products.types'
// import { formatCurrency } from '@/lib/utils/utils'

// export default function ProductPrice({ product }: { product: Product }) {
// 	const price: string = formatCurrency(product.price)
// 	const stock: number = product.stock
// 	const currency = price[0]
// 	const [int, decimal] = price.slice(1).split('.')

// 	return (
// 		<>
// 			{stock > 0 ? (
// 				<p>
// 					<span className="font-medium text-sm align-super">{currency}</span>
// 					<span className="font-medium text-2xl">{int},</span>
// 					<span className="text-sm font-medium align-super">{decimal}</span>
// 				</p>
// 			) : (
// 				<p className="text-destructive font-medium">Out of stock</p>
// 			)}
// 		</>
// 	)
// }
