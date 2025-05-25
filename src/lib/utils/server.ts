import { Product } from '@/lib/types/products.types';
import { ProductSchema } from '@/lib/utils/validators';
import { formatNumberWithDecimalToString } from '@/lib/utils/utils';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

// Normalize Products from db into JS object
export function safeNormalizeProducts(data: Product[]): Product[] {
	const parsedData = data.flatMap((product) => {
		// Validate datas from db on backend side and prepare for client
		// Checking whether the data fits the validation zod schema
		const parsed = ProductSchema.safeParse({
			...product,
			price: formatNumberWithDecimalToString(product.price),
			rating: product.rating.toString(),
			numReviews: product.numReviews.toString(),
		});

		if (!parsed.success) {
			console.warn('Invalid product skipped:', parsed.error);
			return [];
		}

		return [
			{
				...parsed.data,
				id: product.id,
				createdAt: product.createdAt,
			},
		];
	});

	return parsedData;
}

// Normalize Product from db into JS object
export function safeNormalizeProduct(product: Product): Product {
	// Validate data from DB on backend side and prepare for client
	// Checking whether the data fits the validation zod schema
	const parsed = ProductSchema.safeParse({
		...product,
		price: formatNumberWithDecimalToString(product.price),
		rating: product.rating.toString(),
		numReviews: product.numReviews.toString(),
	});

	if (!parsed.success) {
		console.warn('Invalid product skipped:', parsed.error);
		return {} as Product; // DONT DO THAT ONLY FOR TEST
	}

	return {
		...parsed.data,
		id: product.id,
		createdAt: product.createdAt,
	};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatErrorMessages(error: any) {
	if (error instanceof ZodError) {
		// Handle Zod errors
		const fieldErrorMessages: string[] = Object.keys(error.errors).map(
			(field) => error.errors[Number(field)].message
		);

		return fieldErrorMessages.join('. ');
	} else if (
		error.name instanceof Prisma.PrismaClientKnownRequestError &&
		error.code === 'P2002'
	) {
		// Handle prisma errors
		const field: string = error.meta?.target
			? error.meta?.target[0]
			: 'Field';

		return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
	} else if (error instanceof Error) {
		// Handle other errors
		return typeof error.message === 'string'
			? error.message
			: JSON.stringify(error.message);
	} else {
		// Handle others
		return 'Something went wrong';
	}
}

// Make text shorter
export const truncateText = (text: string | null, end: number = 4) => {
	if (text !== null) {
		return `${text.slice(0, end)}...`;
	} else {
		return;
	}
};
