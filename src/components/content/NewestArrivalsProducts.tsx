// lib
import sampleData from '@/lib/db/sample-data'
// components
import ProductList from '@/components/content/ProductList'

export default function NewestArrivalsProducts() {
	return (
		<div className="w-full my-10">
			<h2 className="h2-bold mb-4">Newest Arrivals</h2>
			<ProductList data={sampleData.products} />
		</div>
	)
}
