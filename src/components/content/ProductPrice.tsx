// modules
import { cn } from '@/lib/utils/utils'

type ProductPriceProps = {
	value: string
	className?: string
}

export default function ProductPrice({ value, className }: ProductPriceProps) {
	return (
		// <p>
		// 	<span className={cn('font-medium text-2xl', className)}>$</span>
		// 	<span className={cn('font-bold text-2xl', className)}>
		// 		{intValue},
		// 	</span>
		// 	<span className="text-sm align-super">{floatValue}</span>
		// </p>

		<p>
			<span className={cn('font-medium text-2xl', className)}>$</span>
			<span className={cn('font-bold text-2xl', className)}>
				{value},
			</span>
		</p>
	)
}
