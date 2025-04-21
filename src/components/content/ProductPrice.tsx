// modules
import { cn } from '@/lib/utils'

type ProductPriceProps = {
	value: number
	className?: string
}

export default function ProductPrice({ value, className }: ProductPriceProps) {

	console.log("PRICE FROM PRODUCTPRICE", value, typeof value)
	// Ensure to decimal places
	const stringValue = value.toFixed(2)

	// Get the int/float
	const [intValue, floatValue] = stringValue.split('.')

	console.log("$$$", typeof intValue)

	return (
		<p>
			<span className={cn('font-medium text-2xl', className)}>$</span>
			<span className={cn('font-bold text-2xl', className)}>{intValue},</span>
			<span className='text-sm align-super'>{floatValue}</span>
		</p>
	)
}
