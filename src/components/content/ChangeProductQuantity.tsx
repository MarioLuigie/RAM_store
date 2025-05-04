'use client';
// modules
import { useState } from 'react';
// lib
import { useOptimisticCartActions } from '@/lib/hooks/useOptimisticCartActions';
import { CartItem } from '@/lib/types/cart.types';
// components
import ChangeCartContentButton from '@/components/content/ChangeProductQuantityButton';

type ChangeProductQuantityProps = {
	productStock: number;
	item: CartItem;
	quantity: number;
}

export function ChangeProductQuantity({
	productStock,
	item,
	quantity,
}: ChangeProductQuantityProps) {
	// CURRENT STATE FOR OPTIMISTIC UPDATE
	const [currentQuantity, setCurrentQuantity] = useState(quantity);
	const { addToCart, removeFromCart, canAdd, canRemove } = useOptimisticCartActions({
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
