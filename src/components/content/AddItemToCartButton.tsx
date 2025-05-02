'use client';
// modules
import { useState } from 'react';
// lib
import { Cart, CartItem } from '@/lib/types/cart.types';
import {
	handleAddItemToCart,
	handleRemoveItemFromCart,
} from '@/lib/handlers/cart.handlers';
import { useAddItemToCartToast } from '@/lib/hooks/useAddItemToCartToast';
import { useRemovedItemFromCartToast } from '@/lib/hooks/useRemovedItemFromCartToast';
// components
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

export default function AddItemToCartButton({
	cart,
	cartItem,
	productStock,
}: {
	cart?: Cart | undefined;
	cartItem: CartItem;
	productStock: number;
}) {
	console.log(cart, cartItem);

	const { showAddItemToCartToast } = useAddItemToCartToast();
	const { showRemovedItemFromCartToast } = useRemovedItemFromCartToast();

	const existCartItem =
		cart && cart.items.find((item) => item.productId === cartItem.productId);
	const [quantity, setQuantity] = useState(existCartItem?.qty || 0);

	const canAdd = quantity < productStock;
	const canRemove = quantity > 0;

	const addToCart = () => {
		try {
			handleAddItemToCart(cartItem, showAddItemToCartToast);
			setQuantity((prev) => prev + 1);
		} catch (error) {
			console.error('Failed to add item to cart:', error);
		}
	};

	const removeFromCart = () => {
		if (!existCartItem) return;

		try {
			handleRemoveItemFromCart(
				existCartItem.productId,
				showRemovedItemFromCartToast
			);
			setQuantity((prev) => Math.max(0, prev - 1));
		} catch (error) {
			console.error('Failed to remove item from cart:', error);
		}
	};

	return (
		<div>
			<div className="flex items-center justify-between mt-4">
				<Button
					disabled={!canRemove}
					type="button"
					variant="outline"
					className="cursor-pointer"
					onClick={removeFromCart}
				>
					<Minus className="h-4 w-4" />
				</Button>
				<span className="min-w-12 w-full flex-center text-xl px-2">
					{quantity || '0'}
				</span>
				<Button
					disabled={!canAdd}
					type="button"
					variant="outline"
					className="cursor-pointer"
					onClick={addToCart}
				>
					<Plus className="h-4 w-4" />
				</Button>
			</div>

			<div className="w-full mt-4">
				<Button
					disabled={canRemove}
					type="button"
					className="w-full cursor-pointer"
					onClick={addToCart}
				>
					<Plus />
					Add to Cart
				</Button>
			</div>
		</div>
	);
}
