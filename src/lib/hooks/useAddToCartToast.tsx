import { useCallback } from 'react'
import { toast } from 'sonner' // albo skąd masz import toasta
import Image from 'next/image'
import { X } from 'lucide-react' // zakładam, że X masz z lucide-react
import { CartItem } from '@/lib/types/cart.types'
import { cn } from '@/lib/utils/utils'
import { truncateText } from '@/lib/utils/utils'
import ToolTip from '@/components/shared/ToolTip'

// Custom hook
export function useAddToCartToast() {
	const showAddToCartToast = useCallback(
		(message: string, item: CartItem, isSuccess: boolean = true) => {
			toast.custom((id) => (
				<div
					className={cn(
						'relative flex items-center gap-3 px-4 py-2 rounded-md border-[1px] border-[#e9e9e9] dark:border-[#3d3d3d] shadow-md dark:bg-[#252525] bg-[#f7f7f7]',
						isSuccess
							? 'dark:bg-[#252525] bg-[#f7f7f7] dark:text-zinc-100 text-[#383838]'
							: 'bg-red-200 dark:bg-red-300 dark:text-[#383838] text-[#383838]'
					)}
				>
					{/* MESSAGE */}
					<ToolTip message={item.name}>
						<div>
							<p className='text-start'>{truncateText(item.name, 20)}</p>
							<p>
								{isSuccess
									? 'successfully added to the Cart!'
									: 'not added to the Cart!'}
							</p>
						</div>
					</ToolTip>
					{/* IMAGE */}
					<Image
						src={item.image}
						alt={item.name}
						className="w-[50px] h-[50px] flex-shrink-0 mr-2.5 rounded-xs"
						width={50}
						height={50}
					/>
					<button
						onClick={() => toast.dismiss(id)}
						className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 w-4"
					>
						<X className="w-4" />
					</button>
				</div>
			))
		},
		[]
	)

	return { showAddToCartToast }
}
