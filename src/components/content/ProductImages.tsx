'use client'
// modules
import { useState } from 'react'
// lib
import { cn } from '@/lib/utils/utils'
import { ProductImage } from '@/lib/types/products.types'
// components
import Image from 'next/image'

export default function ProductImages({ images }: { images: ProductImage[] }) {
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

	return (
		<div className="space-y-4">
			<Image
				src={images[currentImageIndex].url}
				alt="product"
				width={300}
				height={300}
				className="min-h-[300px] object-cover object-center"
			/>
			<div className='flex gap-2'>
				{images.map((image, i) => (
					<div key={i} className={cn('border border-b-gray-400 cursor-pointer', currentImageIndex === i && 'border-black border-2')} onClick={() => setCurrentImageIndex(i)}>
						<Image
							src={image.url}
							alt="product"
							width={100}
							height={100}
						/>
					</div>
				))}
			</div>
		</div>
	)
}
