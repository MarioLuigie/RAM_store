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
import Image from 'next/image'

export default async function ProductDetailsPage({ slug }: { slug: string }) {
	const { success, data: product }: IDataResult<Product> =
		await getProductBySlug(slug)

	if (!success) notFound()

	return (
		<>
			<section className="bg-red-300">
				<div className="grid grid-cols-1 md:grid-cols-5">
					{/* IMAGES COL */}
					<div className="col-span-2">
						<Image
							src={product.images[0]}
							alt={product.name}
							width={300}
							height={300}
						/>
					</div>

					{/* DETAILS COL */}
					<div className="col-span-2 p-5">
						<div className="flex flex-col gap-6">
							<p>
								{product.brand} {product.category}
							</p>
							<h1 className="h3-bold">{product.name}</h1>
							<p>
								{product.rating} of {product.numReviews} Reviews
							</p>

							{/* PRODUCT PRICE */}
							<div className="flex flex-col sm:flex-row sm:items-center gap-3">
								<ProductPrice product={product} />
							</div>
						</div>

						<div className="mt-10">
							<p className="font-semibold">Description</p>
							<p>{product.description}</p>
						</div>
					</div>

					{/* ACTION COL */}
					<div>
						<Card>
							<CardContent className="p-4">
								<div className="mb-2 flex justify-between">
									<div>Price</div>
									<div>
										<ProductPrice product={product} />
									</div>
								</div>

								<div className="mb-2 flex justify-between">
									<div>Status</div>
									{product.stock > 0 ? (
										<Badge variant="outline">In Stock</Badge>
									) : (
										<Badge variant="destructive">Out of Stock</Badge>
									)}
								</div>
								{product.stock > 0 && (
									<div className="flex-center">
										<Button className='w-full'>Add to Cart</Button>
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<p>{product.name}</p>
			<p>{product.stock}</p>

			<p>{product.slug}</p>
			<Badge variant="outline">Badge</Badge>
		</>
	)
}
