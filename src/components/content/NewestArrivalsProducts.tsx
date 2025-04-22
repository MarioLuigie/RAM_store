// lib
import { getLatestProducts } from '@/lib/actions/product.actions'
import { normalizeProduct } from '@/lib/utils/utils'
import { Product } from '@/lib/types/products.types'
import { Product as PrismaProduct } from '@prisma/client'
// components
import ProductList from '@/components/content/ProductList'

export default async function NewestArrivalsProducts() {
	// PRODUCTS WITH PRISMA TYPES AND NORMALIZE INTO PRODUCT APP TYPE
	const latestProducts: PrismaProduct[] = await getLatestProducts()
	const normalizedLatestProducts: Product[] = latestProducts.map(normalizeProduct)

	return (
		<div className="w-full my-10">
			<h2 className="h2-bold mb-4">Newest Arrivals</h2>
			<ProductList data={normalizedLatestProducts} />
		</div>
	)
}
