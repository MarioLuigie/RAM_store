'use client';
// lib
import { CartItem } from '@/lib/types/cart.types';
import { handleAddItemToCart } from '@/lib/handlers/cart.handlers';
import { useAddItemToCartToast } from '@/lib/hooks/useAddItemToCartToast';
// components
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function AddItemToCart({ cartItem }: { cartItem: CartItem }) {
	console.log(cartItem);
	const { showAddItemToCartToast } = useAddItemToCartToast();

	return (
		<div className="w-full mt-4">
			<Button
				type="button"
				className="w-full cursor-pointer"
				onClick={() => handleAddItemToCart(cartItem, showAddItemToCartToast)}
			>
				<Plus />
				Add to Cart
			</Button>
		</div>
	);
}
