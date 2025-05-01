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
		<div className="flex items-center justify-between mt-4">
			<Button
				type="button"
				variant='outline'
				className="cursor-pointer"
				onClick={() =>
					handleRemoveItemFromCart(existCartItem.productId, showRemovedItemFromCartToast)
				}
			>
				<Minus className='h-4 w-4'/>
			</Button>
			<span className='min-w-12 w-full flex-center text-xl px-2'>
				{existCartItem.qty}
			</span>
			<Button
				type="button"
				variant='outline'
				className="cursor-pointer"
				onClick={() =>
					handleAddItemToCart(cartItem, showAddItemToCartToast)
				}
			>
				<Plus className='h-4 w-4'/>
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
