'use server'
// lib
import { CartItem } from '@/lib/types/cart.types'

export async function addToCart(item: CartItem) {
	console.log(item)

  return {
    success: true,
    message: `${item.name} successfully added to cart`
  }
}
