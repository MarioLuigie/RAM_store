import { z } from 'zod';
import { formatNumberWithDecimalToString } from '@/lib/utils/utils';
import { PAYMENT_METHODS } from '../constants';

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
	.strict(); // odrzuca nieznane pola, zapobiega atakom i błędom

// SCHEMA FOR SIGN UP FORM
export const SignUpFormSchema = z
	.object({
		name: z.string().min(3, 'Name must be at least 3 characters'),
		email: z
			.string({ required_error: 'E-mail is required' })
			.email('Enter a valid e-mail address')
			.transform((val) => val.trim().toLowerCase()),
		password: z
			.string({ required_error: 'Password is required' })
			.min(6, 'Password must be at least 6 characters')
			.max(100, 'Password is too long'),
		confirmPassword: z
			.string()
			.min(6, 'Confirm Password must be at least 6 characters')
			.max(100, 'Password is too long'),
	})
	.strict()
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Password and Confirm Password do not match',
		path: ['confirmPassword'],
	});

// SCHEMA FOR INSERTING PRODUCTS
const currency = z
	.string()
	.refine(
		(value) =>
			/^\d+(\.\d{2})?$/.test(formatNumberWithDecimalToString(Number(value))),
		'Price must have exactly two decimal places'
	);

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
});

// SCHEMA FOR CART ITEM
export const CartItemSchema = z.object({
	productId: z.string().min(1, 'Product is required'),
	name: z.string().min(1, 'Name is required'),
	slug: z.string().min(1, 'Slug is required'),
	qty: z.number().int().nonnegative('Quantity must be a possitive number'),
	image: z.string().min(1, 'Image is required'),
	price: currency,
});

// SCHEMA FOR CART
export const CartSchema = z.object({
	sessionCartId: z.string().min(1, 'Session cart id is required'),
	userId: z.string().optional().nullable(),
	items: z.array(CartItemSchema),
	itemsPrice: currency,
	shippingPrice: currency,
	taxPrice: currency,
	totalPrice: currency,
});

// SCHEMA FOR SHIPPING ADDRESS
export const ShippingAddressSchema = z.object({
	fullName: z.string().min(3, 'Name must be at least 3 characters'),
	streetAddress: z
		.string()
		.min(3, 'Street address must be at least 3 characters'),
	city: z.string().min(3, 'City must be at least 3 characters'),
	postalCode: z.string().min(3, 'Postal code must be at least 3 characters'),
	country: z.string().min(3, 'Country must be at least 3 characters'),
	lat: z.number().optional(),
	lng: z.number().optional(),
});

// SCHEMA FOR PAYMENT METHOD
export const PaymentMethodSchema = z
	.object({
		type: z.string().min(1, 'Payment method is required'),
	})
	.refine((data) => PAYMENT_METHODS.includes(data.type), {
		path: ['type'],
		message: 'Invalid payment method',
	});


// SCHEMA FOR INSERTING ORDER
export const OrderSchema = z.object({
	userId: z.string().min(1, 'User is required'),
	itemsPrice: currency,
	shippingPrice: currency,
	taxPrice: currency,
	totalPrice: currency,
	paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
		message: 'Invalid payment method'
	}),
	shippingAddress: ShippingAddressSchema,
});

// SCHEMA FOR INSERTING ORDER ITEM
export const OrderItemSchema = z.object({
	productId: z.string(),
	slug: z.string(),
	image: z.string(),
	name: z.string(),
	price: currency,
	qty: z.number(),
});

// SCHEMA FOR PAYMENT RESULT
export const PaymentResultSchema = z.object({
	id: z.string(),
	status: z.string(),
	email_address: z.string(),
	pricePaid: z.string(),
});

// SCHEMA FOR UPDATING THE USER PROFILE
export const UpdateProfileSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters'),
	email: z.string().min(3, 'E-mail must be at least 3 characters'),
});

// SCHEMA FOR INSERTING/ADDING PRODUCTS
export const AddProductSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters'),
	slug: z.string().min(3, 'Slug must be at least 3 characters'),
	category: z.string().min(3, 'Category must be at least 3 characters'),
	brand: z.string().min(3, 'Brand must be at least 3 characters'),
	description: z.string().min(3, 'Description must be at least 3 characters'),
	stock: z.coerce.number(),
	images: z.array(z.string()).min(1, 'Product must have at least one image'),
	isFeatured: z.boolean(),
	banner: z.string().nullable(),
	price: currency,
});

// SCHEMA FOR UPDATING PRODUCT
export const UpdateProductSchema = AddProductSchema.extend({
	id: z.string().min(1, 'Id is required'),
});