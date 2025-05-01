'use client';
// lib
import { Cart, CartItem } from '@/lib/types/cart.types';
import { handleAddItemToCart, handleRemoveItemFromCart } from '@/lib/handlers/cart.handlers';
import { useAddItemToCartToast } from '@/lib/hooks/useAddItemToCartToast';
import { useRemovedItemFromCartToast } from '@/lib/hooks/useRemovedItemFromCartToast';
// components
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

export default function AddItemToCartButton({
	cart,
	cartItem,
}: {
	cart?: Cart | undefined;
	cartItem: CartItem;
}) {
	console.log(cart, cartItem);
	const { showAddItemToCartToast } = useAddItemToCartToast();
	const { showRemovedItemFromCartToast } = useRemovedItemFromCartToast();
	const existCartItem =
		cart && cart.items.find((item) => item.productId === cartItem.productId);

	return existCartItem ? (
		<div className="w-full mt-4">
			<Button
				type="button"
				variant='outline'
				className="w-full cursor-pointer"
				onClick={() =>
					handleRemoveItemFromCart(existCartItem.productId, showRemovedItemFromCartToast)
				}
			>
				<Minus />
				Remove from Cart
			</Button>
		</div>
	) : (
		<div className="w-full mt-4">
			<Button
				type="button"
				className="w-full cursor-pointer"
				onClick={() =>
					handleAddItemToCart(cartItem, showAddItemToCartToast)
				}
			>
				<Plus />
				Add to Cart
			</Button>
		</div>
	);
}
