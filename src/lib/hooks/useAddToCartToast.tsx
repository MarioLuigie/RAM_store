'use client'

import { useCallback } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'
import { X } from 'lucide-react'
import { CartItem } from '@/lib/types/cart.types'
import { cn } from '@/lib/utils/utils'
import { truncateText } from '@/lib/utils/utils'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/constants/paths'

// Custom hook
export function useAddToCartToast() {
	const router = useRouter()

	const showAddToCartToast = useCallback(
		(message: string, item: CartItem, isSuccess: boolean = true) => {
			toast.custom((id) => (
				<div
					className={cn(
						'relative flex items-center gap-2 px-4 py-2 rounded-md border-[1px] border-[#e9e9e9] dark:border-[#3d3d3d] shadow-md dark:bg-[#252525] bg-[#f7f7f7]',
						isSuccess
							? 'dark:bg-[#252525] bg-[#f7f7f7] dark:text-zinc-100 text-[#383838]'
							: 'bg-red-200 dark:bg-red-300 dark:text-[#383838] text-[#383838]'
					)}
					title={item.name}
				>
					{/* MESSAGE */}
					<div>
						<p className="text-start font-medium">
							{truncateText(item.name, 21)}
						</p>
						<p>
							{isSuccess
								? 'successfully added to the Cart!'
								: 'not added to the Cart!'}
						</p>
					</div>

					<div className="flex items-center gap-2 mr-5">
						{/* IMAGE */}
						<Image
							src={item.image}
							alt={item.name}
							className="w-[50px] h-[50px] flex-shrink-0 rounded-sm"
							width={50}
							height={50}
						/>

						{/* SHOPPING CART BUTTON REDIRECT TO THE CART ROUTE */}
						<Button
							title="Go to the Cart!"
							className="button-pulse rounded-sm w-[40px] h-[40px]"
							onClick={() => router.push(ROUTES.CART)}
						>
							<ShoppingCart color="#383638" />
						</Button>
					</div>

					<button
						onClick={() => toast.dismiss(id)}
						className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 w-4"
					>
						<X className="w-4" />
					</button>
				</div>
			))
		},
		[router]
	)

	return { showAddToCartToast }
}
