'use client'
// lib
import { CartItem } from '@/lib/types/cart.types'
import { handleAddToCart } from '@/lib/handlers/cart.handlers'
import { useAddToCartToast } from '@/lib/hooks/useAddToCartToast'
// components
import { Button } from '@/components/ui/button'

export default function AddToCart({ item }: { item: CartItem }) {
	console.log(item)
	const { showAddToCartToast } = useAddToCartToast()

	return (
		<div className="w-full mt-4">
			<Button
				type="button"
				className="w-full cursor-pointer"
				onClick={() => handleAddToCart(item, showAddToCartToast)}
			>
				Add to Cart
			</Button>
		</div>
	)
}
