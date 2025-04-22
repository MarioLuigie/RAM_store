import { Product as PrismaProduct } from '@prisma/client'
import { Product } from '@/lib/types/products.types'
import { ProductSchema } from '@/lib/utils/validators'

// Normalize Products from db into JS object 
export function safeNormalizeProducts(data: PrismaProduct[]): Product[] {
  
	const parsedData = data.flatMap((product) => {
		// Validate datas from db on backend side
		const parsed = ProductSchema.safeParse({
			...product,
			price: product.price.toFixed(2),
			rating: product.rating.toFixed(1),
		})

		if (!parsed.success) {
			console.warn('Invalid product skipped:', parsed.error)
			return []
		}

		return [
			{
				...parsed.data,
				id: product.id,
				createdAt: product.createdAt,
			},
		]
	})

	return parsedData
}
