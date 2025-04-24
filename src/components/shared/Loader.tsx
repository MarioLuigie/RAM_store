// lib
import { ICONS } from '@/lib/constants/icons'
// components
import Image from 'next/image'

type LoaderProps = {
	width?: number
	height?: number
}

export default function Loader({ width = 150, height = 150 }: LoaderProps) {
	return (
		<Image
			src={ICONS.LOADER.path}
			alt={ICONS.LOADER.alt}
			width={width}
			height={height}
			unoptimized
		/>
	)
}
