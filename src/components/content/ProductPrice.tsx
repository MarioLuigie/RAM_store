// modules
import { stylePrice } from '@/lib/utils/utils'

type ProductPriceProps = {
	value: string
	className?: string
}

export default function ProductPrice({ value }: ProductPriceProps) {
	return (


			stylePrice(value)

	)
}
