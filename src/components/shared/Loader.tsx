// lib
import { ICONS } from '@/lib/constants/icons'
import { cn } from '@/lib/utils/utils'
// components
import Image from 'next/image'
import { StringifyOptions } from 'querystring'

type LoaderProps = {
	width?: number
	height?: number
	className?: StringifyOptions
}

export default function Loader({ width = 150, height = 150, className }: LoaderProps) {
	return (
		<Image
			src={ICONS.LOADER.path}
			alt={ICONS.LOADER.alt}
			width={width}
			height={height}
			className={cn(className)}
			unoptimized
		/>
	)
}
