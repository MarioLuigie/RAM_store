// modules
import { notFound } from 'next/navigation'
// lib
import { getProductBySlug } from '@/lib/actions/product.actions'
import { Product } from '@/lib/types/products.types'
// components
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ProductPrice from '@/components/content/ProductPrice'

export default async function ProductDetailsPage({ slug }: { slug: string }) {
	const { success, data }: IDataResult<Product> = await getProductBySlug(slug)

	if (!success) notFound()

	return (
		<div>
			<p>{data.name}</p>
			<p>{data.stock}</p>
			{/* PRODUCT PRICE */}
			<ProductPrice product={data} />
			<p>{data.slug}</p>
			<Badge variant="outline">Badge</Badge>
		</div>
	)
}
