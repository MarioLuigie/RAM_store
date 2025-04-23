import { getProductBySlug } from '@/lib/actions/product.actions'
import { notFound } from 'next/navigation'

export default async function ProductDetailsPage({ slug }: { slug: string }) {
	const { success, data } = await getProductBySlug(slug)

	if(!success) notFound()

	return (
		<div>
			<p>{data.name}</p>
			<p>{data.stock}</p>
			<p>{data.price}</p>
			<p>{data.slug}</p>
		</div>
	)
}
