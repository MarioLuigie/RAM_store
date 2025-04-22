// lib
import { getLatestProducts, getProductBySlug } from '@/lib/actions/product.actions'
import { Product } from '@/lib/types/products.types'
// components
import ProductList from '@/components/content/ProductList'

export default async function NewestArrivalsProducts() {
	// PRODUCTS WITH PRISMA TYPES AND NORMALIZE INTO PRODUCT APP TYPE
	const { success, data }: IDataResult<Product[]> = await getLatestProducts()
	const result: IDataResult<Product> = await getProductBySlug("polo-classic-pink-hoodie")// test

	console.log(result)

	if (!success) {
		return (
			<div className="w-full my-10">
				<h2 className="h2-bold mb-4">Newest Arrivals</h2>
				<p className="text-sm text-red-500">
					Failed to load products. Please try again later.
				</p>
			</div>
		)
	}

	return (
		<div className="w-full my-10">
			<h2 className="h2-bold mb-4">Newest Arrivals</h2>
			<ProductList data={data} />
		</div>
	)
}
