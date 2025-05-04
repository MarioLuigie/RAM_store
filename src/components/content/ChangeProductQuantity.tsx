'use client';
// modules
import { useState } from 'react';
// lib
import { useCartActions } from '@/lib/hooks/useCartActions';
import { CartItem } from '@/lib/types/cart.types';
// components
import ChangeCartContentButton from '@/components/content/ChangeProductQuantityButton';

export function ChangeProductQuantity({
	productStock,
	item,
	quantity,
}: {
	productStock: number;
	item: CartItem;
	quantity: number;
}) {
	// CURRENT STATE FOR OPTIMISTIC UPDATE
	const [currentQuantity, setCurrentQuantity] = useState(quantity);
	const { addToCart, removeFromCart, canAdd, canRemove } = useCartActions({
		cartItem: item,
		productStock,
		existCartItem: item,
		quantity: currentQuantity,
		setQuantity: setCurrentQuantity,
	});

	return (
		<ChangeCartContentButton
			removeFromCart={removeFromCart}
			addToCart={addToCart}
			canRemove={canRemove}
			canAdd={canAdd}
			quantity={currentQuantity}
		/>
	);
}
