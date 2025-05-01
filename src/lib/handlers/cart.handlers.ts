// lib
import { addToCart } from '@/lib/actions/cart.actions'
import { CartItem } from '@/lib/types/cart.types'

export async function handleAddToCart(
	cartItem: CartItem,
	showAddToCartToast: (message: string, data: CartItem, isSuccess: boolean) => void
) {
	const { success, message, data } = await addToCart(cartItem)

	if (success) {
		showAddToCartToast(message, data, true)
	} else {
		showAddToCartToast(message, data, false)
	}
}
