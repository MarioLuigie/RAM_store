'use client';
// modules
import { useState } from 'react';
// lib
import { Product } from '@/lib/types/products.types';
import { Cart } from '@/lib/types/cart.types';
// components
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ProductPrice from '@/components/content/ProductPrice';
import AddProductToCartActions from '@/components/content/AddProductToCartActions';
import { formatCurrency } from '@/lib/utils/utils';

export default function AddProductToCartPanel({
	cart,
	product,
}: {
	cart?: Cart | undefined;
	product: Product;
}) {
	const existCartItem =
		cart && cart.items.find((item) => item.productId === product.id);

	const [quantity, setQuantity] = useState(existCartItem?.qty || 0);

	const isInStock = product.stock > 0;
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
						{isInStock ? (
							<Badge variant="outline">In Stock</Badge>
						) : (
							<Badge variant="destructive">Out of Stock</Badge>
						)}
					</div>

					{isInStock && (
						<div className="flex-center">
							<AddProductToCartActions
								cartItem={{
									productId: product.id,
									name: product.name,
									slug: product.slug,
									qty: 1,
									image: product.images![0].url,
									price: product.price,
								}}
								productStock={product.stock}
								quantity={quantity}
								setQuantity={setQuantity}
								existCartItem={existCartItem}
							/>
						</div>
					)}

					{isInStock && cart && (
						<div className="mt-4">
							<p className="text-sm text-center text-neutral-400">{`You currently have ${quantity} units of this product in your cart. Your cart total: ${formatCurrency(cart.itemsPrice)}`}</p>
						</div>
					)}

				</CardContent>
			</Card>
		</div>
	);
}
