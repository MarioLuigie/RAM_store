// components
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Product } from '@/lib/types/products'
import Link from 'next/link'
import Image from 'next/image'

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
					{/* PRODUCT RATING */}
					<div className="flex-between gap-4">{product.rating} Stars</div>
					{/* PRODUCT PRICE */}
					{product.stock > 0 ? (
						<p className='font-bold'>{product.price}</p>
					) : (
						<p className="text-destructive">Out of stock</p>
					)}
				</CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>
		</div>
	)
}
