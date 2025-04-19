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
				</CardHeader>
				<CardContent>
					<p>Card Content</p>
					<Image
						src={product.images[0]}
						alt={product.name}
						width={300}
						height={300}
						priority
					/>
				</CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>
		</div>
	)
}
