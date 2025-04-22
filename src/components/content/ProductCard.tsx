// lib
import { Product } from '@/lib/types/products.types'
// components
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import ProductPrice from '@/components/content/ProductPrice'

export default function ProductCard({ product }: { product: Product }) {
	return (
		<Card className="transform transition-all duration-300 hover:scale-105">
			<CardHeader>
				<div className="h-18">
					<CardTitle>{product.name}</CardTitle>
					<CardDescription>{product.description}</CardDescription>
				</div>
				<Image
					src={product.images[0]}
					alt={product.name}
					width={300}
					height={300}
					priority
				/>
			</CardHeader>
			<CardContent className="px-4 grid gap-4">
				{/* PRODUCT NAME */}
				<p className="text-xs">{product.brand}</p>

				{/* LINK TO PRODUCT SITE */}
				<div className="h-20 flex flex-col justify-between">
					<Link href={`/product/${product.slug}`}>
						<h2 className="font-medium">{product.name}</h2>
					</Link>
					<div className="flex-between gap-4">
						{/* PRODUCT RATING */}
						<p>{product.rating} Stars</p>

						{/* PRODUCT PRICE */}
						<ProductPrice product={product} />
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
