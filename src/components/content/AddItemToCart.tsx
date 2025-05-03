'use client'
// lib
import { Product } from '@/lib/types/products.types';
import { Cart } from '@/lib/types/cart.types';
// components
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ProductPrice from '@/components/content/ProductPrice';
import AddItemToCartButton from '@/components/content/AddItemToCartButton';

export default function AddItemToCart({
	cart,
	product,
}: {
	cart?: Cart | undefined;
	product: Product;
}) {
	return (
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

					<div className="mt-4">
						<p className="text-sm text-center text-neutral-400">{`You currently have units of this product in your cart.`}</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
