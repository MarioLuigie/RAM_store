// modules
import { toast } from 'sonner'
// lib
import { addToCart } from '@/lib/actions/cart.actions'
import { CartItem } from '@/lib/types/cart.types'


export async function handleAddToCart(
	item: CartItem,
	showCartToast: (message: string, item: CartItem) => void
	,
) {
	const { success, message } = await addToCart(item)

	if (success) {
		showCartToast(message, item)
	} else {
		toast.error(message) // Make your custom error toast
	}
}
