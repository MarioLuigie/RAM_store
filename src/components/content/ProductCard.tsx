// lib
import { Product } from '@/lib/types/products'
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
		<div>
			<Card>
				<CardHeader>
					<CardTitle>{product.name}</CardTitle>
					<CardDescription>{product.description}</CardDescription>
					<Image
						src={product.images[0]}
						alt={product.name}
						width={300}
						height={300}
						priority
					/>
				</CardHeader>
				<CardContent className="p-4 grid gap-4">
					{/* PRODUCT NAME */}
					<p className="text-xs">{product.brand}</p>
					{/* LINK TO PRODUCT SITE */}
					<Link href={`/product/${product.slug}`}>
						<h2 className="font-medium">{product.name}</h2>
					</Link>
					<div className="flex-between gap-4">
						{/* PRODUCT RATING */}
						{product.rating} Stars
						{/* PRODUCT PRICE */}
						{product.stock > 0 ? (
							<ProductPrice value={product.price} />
						) : (
							<p className="text-destructive">Out of stock</p>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
