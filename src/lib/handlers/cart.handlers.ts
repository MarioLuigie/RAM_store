// modules
// import { toast } from 'sonner'
// lib
import { addToCart } from '@/lib/actions/cart.actions'
import { CartItem } from '@/lib/types/cart.types'

export async function handleAddToCart(
	item: CartItem,
	customToast: (message: string) => void
) {
	const { success, message } = await addToCart(item)

	if (success) {
		customToast(message)
	}
}
