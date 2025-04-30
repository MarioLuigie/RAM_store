// lib
import { addToCart } from '@/lib/actions/cart.actions'
import { CartItem } from '@/lib/types/cart.types'

export async function handleAddToCart(
	cartItem: CartItem,
	showCartToast: (message: string, data: CartItem, isSuccess: boolean) => void
) {
	const { success, message, data } = await addToCart(cartItem)

	if (success) {
		showCartToast(message, data, true)
	} else {
		showCartToast(message, data, false)
	}
}
