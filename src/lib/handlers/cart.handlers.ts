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
	const result = await addItemToCart(cartItem);
	const { success, message, data } = result

	if (success) {
		showAddItemToCartToast(message, data, success);
		return {
			success: true,
			data: result,
			message: 'Item added to the cart'
		}
	} else {
		showAddItemToCartToast(message, data, success);
		return {
			success: false,
			data: result,
			message: 'Item not added to the cart'
		}
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
	const result = await removeItemFromCart(productId);
	const { success, message, data } = result

	if (success) {
		showRemovedItemFromCartToast(message, data, success);
		return {
			success: true,
			data: result,
			message: 'Item removed from the cart'
		}
	} else {
		showRemovedItemFromCartToast(message, data, success);
		return {
			success: false,
			data: result,
			message: 'Item not removed from the cart'
		}
	}
}
