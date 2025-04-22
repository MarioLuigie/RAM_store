import { Product as PrismaProduct } from '@prisma/client'
import { Product } from '@/lib/types/products.types'
import { InsertProductSchema } from '@/lib/utils/validators'

export function safeNormalizeProducts(data: PrismaProduct[]): Product[] {
  
	const parsedData = data.flatMap((product) => {
		const parsed = InsertProductSchema.safeParse({
			...product,
			price: product.price.toString(),
			rating: product.rating.toString(),
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
