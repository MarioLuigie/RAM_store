'use client'
// modules
// import { useRouter } from 'next/navigation'
// import { Plus } from 'lucide-react'
// lib
import { CartItem } from '@/lib/types/cart.types'
import { handleAddToCart } from '@/lib/handlers/cart.handlers'
// components
import { Button } from '@/components/ui/button'

export default function AddToCart({ item }: { item: CartItem }) {
	console.log(item)

	return (
		<div className="w-full mt-4">
			<Button
				type="button"
				className="w-full cursor-pointer"
				onClick={handleAddToCart}
			>
				Add to Cart
			</Button>
		</div>
	)
}
