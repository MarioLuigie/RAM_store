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

// SCHEMA FOR SIGN IN FORM
export const SignInFormSchema = z
	.object({
		email: z
			.string({ required_error: 'E-mail is required' })
			.email('Enter a valid e-mail address')
			.transform((val) => val.trim().toLowerCase()),
		password: z
			.string({ required_error: 'Password is required' })
			.min(6, 'Password must be at least 6 characters')
			.max(100, 'Password is too long'),
	})
	.strict() // odrzuca nieznane pola, zapobiega atakom i błędom

	// SCHEMA FOR SIGN UP FORM
export const SignUpFormSchema = z
.object({
	name: z
		.string().min(3, 'Name must be at least 3 characters'),
	email: z
		.string({ required_error: 'E-mail is required' })
		.email('Enter a valid e-mail address')
		.transform((val) => val.trim().toLowerCase()),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, 'Password must be at least 6 characters')
		.max(100, 'Password is too long'),
	confirmPassword: z
		.string().min(6, 'Confirm Password must be at least 6 characters')
		.max(100, 'Password is too long')
})
.strict() 
.refine((data) => data.password === data.confirmPassword, {
	message: 'Password and Confirm Password do not match',
	path: ['confirmPassword'],
})
