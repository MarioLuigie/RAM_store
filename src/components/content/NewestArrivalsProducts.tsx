// lib
// import sampleData from '@/lib/db/sample-data'
import { getLatestProducts } from '@/lib/actions/product.actions'
// components
import ProductList from '@/components/content/ProductList'

export default async function NewestArrivalsProducts() {
	const latestProducts = await getLatestProducts()

	console.log("#########", typeof latestProducts[0].price)
	return (
		<div className="w-full my-10">
			<h2 className="h2-bold mb-4">Newest Arrivals</h2>
			<ProductList data={latestProducts} />
		</div>
	)
}
