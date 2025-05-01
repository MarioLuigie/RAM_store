// lib
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { CartItem } from '@/lib/types/cart.types';

export async function handleAddItemToCart(
	cartItem: CartItem,
	showAddItemToCartToast: (
		message: string,
		data: CartItem,
		isSuccess: boolean
	) => void
) {
	const { success, message, data } = await addItemToCart(cartItem);

	if (success) {
		showAddItemToCartToast(message, data, success);
	} else {
		showAddItemToCartToast(message, data, success);
	}
}

export async function handleRemoveItemFromCart(
	productId: string,
	showRemovedItemFromCartToast: (
		message: string,
		data: CartItem,
		isSuccess: boolean
	) => void
) {
	console.log(productId);
	const { success, message, data } = await removeItemFromCart(productId);

	if (success) {
		showRemovedItemFromCartToast(message, data, success);
	} else {
		showRemovedItemFromCartToast(message, data, success);
	}
}
