import { z } from 'zod'
import { formatNumberWithDecimalToString } from '@/lib/utils/utils'

// SCHEMA FOR INSERTING PRODUCTS
const currency = z
	.string()
	.refine((value) =>
		/^\d+(\.\d{2})?$/.test(formatNumberWithDecimalToString(Number(value)))
	)

export const ProductSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters'),
	slug: z.string().min(3, 'Slug must be at least 3 characters'),
	category: z.string().min(3, 'Category must be at least 3 characters'),
	brand: z.string().min(3, 'Brand must be at least 3 characters'),
	description: z.string().min(3, 'Description must be at least 3 characters'),
	stock: z.coerce.number(),
	images: z.array(z.string()).min(1, 'Products must have at least 1 image'),
	isFeatured: z.boolean(),
	banner: z.string().nullable(),
	price: currency,
	rating: z.string(),
	numReviews: z.string(),
})


