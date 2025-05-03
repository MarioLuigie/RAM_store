// modules
import { notFound } from 'next/navigation';
// lib
import { getProductBySlug } from '@/lib/actions/product.actions';
import { Product } from '@/lib/types/products.types';
import { getCart } from '@/lib/actions/cart.actions';
// components
import ProductPrice from '@/components/content/ProductPrice';
import ProductImages from '@/components/content/ProductImages';
import AddItemToCart from '@/components/content/AddItemToCart';

export default async function ProductDetailsPage({ slug }: { slug: string }) {
	const { success, data: product }: IDataResult<Product> =
		await getProductBySlug(slug);
	if (!success) notFound();

	const cart = await getCart();
	console.log('CART:', cart);
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
					<AddItemToCart cart={cart} product={product} />
				</div>
			</section>
		</>
	);
}
