import { Product } from '@/lib/types/products.types'
import { ProductSchema } from '@/lib/utils/validators'
import { formatNumberWithDecimalToString } from '@/lib/utils/utils'

// Normalize Products from db into JS object 
export function safeNormalizeProducts(data: Product[]): Product[] {
  
	const parsedData = data.flatMap((product) => {
		// Validate datas from db on backend side and prepare for client
		// Checking whether the data fits the validation zod schema
		const parsed = ProductSchema.safeParse({
			...product,
			price: formatNumberWithDecimalToString(product.price),
			rating: product.rating.toString(),
			numReviews: product.numReviews.toString()
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

// Normalize Product from db into JS object 
export function safeNormalizeProduct(product: Product): Product {
	// Validate data from DB on backend side and prepare for client
	// Checking whether the data fits the validation zod schema
	const parsed = ProductSchema.safeParse({
		...product,
		price: formatNumberWithDecimalToString(product.price),
		rating: product.rating.toString(),
		numReviews: product.numReviews.toString()
	})

	if (!parsed.success) {
		console.warn('Invalid product skipped:', parsed.error)
		return {} as Product // DONT DO THAT ONLY FOR TEST
	}

	return {
		...parsed.data,
		id: product.id,
		createdAt: product.createdAt,
	}
}


