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
				</CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>
		</div>
	)
}
