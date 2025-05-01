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

export async function handleRemoveItemFromCart(productId: string) {
	console.log(productId);
	await removeItemFromCart(productId);
}
