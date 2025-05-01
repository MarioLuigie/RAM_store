// lib
import { addItemToCart } from '@/lib/actions/cart.actions'
import { CartItem } from '@/lib/types/cart.types'

export async function handleAddItemToCart(
	cartItem: CartItem,
	showAddToCartToast: (message: string, data: CartItem, isSuccess: boolean) => void
) {
	const { success, message, data } = await addItemToCart(cartItem)

	if (success) {
		showAddToCartToast(message, data, true)
	} else {
		showAddToCartToast(message, data, false)
	}
}
