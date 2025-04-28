'use server'
// lib
import { CartItem } from '@/lib/types/cart.types'

export async function addToCart(item: CartItem) {
	console.log(item)

	if (true) {
		return {
			success: true,
			data: { name: item.name, image: item.image } as CartItem, // Only tests!
			message: 'Successfully added to the Cart',
		}
	} else {
		return {
			success: false,
			data: { name: item.name, image: item.image } as CartItem, // Only tests!
			message: 'Not added to the Cart',
		}
	}
}
