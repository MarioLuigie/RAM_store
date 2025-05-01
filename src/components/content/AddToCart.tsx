'use client';
// lib
import { CartItem } from '@/lib/types/cart.types';
import { handleAddItemToCart } from '@/lib/handlers/cart.handlers';
import { useAddToCartToast } from '@/lib/hooks/useAddToCartToast';
// components
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function AddToCart({ cartItem }: { cartItem: CartItem }) {
	console.log(cartItem);
	const { showAddToCartToast } = useAddToCartToast();

	return (
		<div className="w-full mt-4">
			<Button
				type="button"
				className="w-full cursor-pointer"
				onClick={() => handleAddItemToCart(cartItem, showAddToCartToast)}
			>
				<Plus />
				Add to Cart
			</Button>
		</div>
	);
}
