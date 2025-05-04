// lib
import { useAddItemToCartToast } from '@/lib/hooks/useAddItemToCartToast';
import { useRemovedItemFromCartToast } from '@/lib/hooks/useRemovedItemFromCartToast';
import {
	handleAddItemToCart,
	handleRemoveItemFromCart,
} from '@/lib/handlers/cart.handlers';
import { CartItem } from '@/lib/types/cart.types';

interface UseCartActionsParams {
	cartItem: CartItem;
	productStock: number;
	quantity: number;
	setQuantity: React.Dispatch<React.SetStateAction<number>>;
	existCartItem: CartItem | undefined;
}

export function useOptimisticCartActions({
	cartItem,
	productStock,
	quantity,
	setQuantity,
	existCartItem,
}: UseCartActionsParams) {
	const { showAddItemToCartToast } = useAddItemToCartToast();
	const { showRemovedItemFromCartToast } = useRemovedItemFromCartToast();

	const canAdd = quantity < productStock;
	const canRemove = quantity > 0;

	const updateQuantity = (delta: number) => {
		setQuantity((prev) => Math.max(0, prev + delta));
	};

	const addToCart = async () => {
		if (!canAdd) return;
		updateQuantity(+1);

		try {
			const result = await handleAddItemToCart(
				cartItem,
				showAddItemToCartToast
			);
			if (!result?.success) updateQuantity(-1);
		} catch (err) {
			console.error('Add to cart failed:', err);
			updateQuantity(-1);
		}
	};

	const removeFromCart = async () => {
		if (!existCartItem || !canRemove) return;
		updateQuantity(-1);

		try {
			const result = await handleRemoveItemFromCart(
				existCartItem.productId,
				showRemovedItemFromCartToast
			);
			if (!result?.success) updateQuantity(+1);
		} catch (err) {
			console.error('Remove from cart failed:', err);
			updateQuantity(+1);
		}
	};

	return {
		addToCart,
		removeFromCart,
		canAdd,
		canRemove,
	};
}
