'use client'

import { CartItem } from '@/lib/types/cart.types'

export default function AddToCart({ item }: { item?: CartItem }) {
	console.log(item)
	return <div>ADD TO CART</div>
}
