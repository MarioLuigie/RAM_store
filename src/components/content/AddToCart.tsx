'use client'
// modules
// import { useRouter } from 'next/navigation'
// import { Plus } from 'lucide-react'
// lib
import { CartItem } from '@/lib/types/cart.types'
import { handleAddToCart } from '@/lib/handlers/cart.handlers'
// components
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Image from 'next/image'
import { X } from 'lucide-react'

export default function AddToCart({ item }: { item: CartItem }) {
	console.log(item)

	function customToast(message: string) {
		toast.custom((id) => (
			<div className="relative flex items-center gap-3 px-4 py-2 rounded-md border-[1px] border-[#e9e9e9] dark:border-[#3d3d3d] shadow-md dark:bg-[#252525] bg-[#f7f7f7] dark:text-zinc-100 text-[#383838]">
				<p>{message}</p>
				<Image
					src={item.image}
					alt={item.name}
					className="w-[50px] h-[50px] flex-shrink-0 mr-2"
					width={50}
					height={50}
				/>
				<button
					onClick={() => toast.dismiss(id)}
					className="absolute top-1 right-1 ml-auto text-gray-500 hover:text-gray-700 w-4"
				>
					<X className='w-4'/>
				</button>
			</div>
		))
	}

	return (
		<div className="w-full mt-4">
			<Button
				type="button"
				className="w-full cursor-pointer"
				onClick={() => handleAddToCart(item, customToast)}
			>
				Add to Cart
			</Button>
		</div>
	)
}
