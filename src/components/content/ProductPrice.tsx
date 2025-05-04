import { Product } from '@/lib/types/products.types'
import StyledPrice from '@/components/content/StyledPrice'

export default function ProductPrice({ product }: { product: Product }) {
	const stock: number = product.stock

	if (stock <= 0) {
		return <p className="text-destructive font-medium">Out of stock</p>
	}

	return (
		<StyledPrice price={product.price} />
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
