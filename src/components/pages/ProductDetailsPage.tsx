// modules
import { notFound } from 'next/navigation'
// lib
import { getProductBySlug } from '@/lib/actions/product.actions'
import { Product } from '@/lib/types/products.types'
import { getCart } from '@/lib/actions/cart.actions'
// components
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import ProductPrice from '@/components/content/ProductPrice'
import ProductImages from '@/components/content/ProductImages'
import AddItemToCartButton from '@/components/content/AddItemToCartButton'

export default async function ProductDetailsPage({ slug }: { slug: string }) {
	const { success, data: product }: IDataResult<Product> =
		await getProductBySlug(slug)
	if (!success) notFound()

	const cart = await getCart();
	console.log("CART:", cart)
	return (
		<>
			<section>
				<div className="grid grid-cols-1 md:grid-cols-5">
					{/* IMAGES COL */}
					<div className="col-span-2">
						<ProductImages images={product.images} />
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
										<AddItemToCartButton
											cart={cart}
											cartItem={{
												productId: product.id,
												name: product.name,
												slug: product.slug,
												qty: 1,
												image: product.images![0],
												price: product.price,
											}}
											productStock={product.stock}
										/>
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</>
	)
}
