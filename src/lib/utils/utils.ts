import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Product } from '@/lib/types/products.types'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// Convert prisma object into regular JS object
export function convertToPlainObject<T>(value: T): T {
	return JSON.parse(JSON.stringify(value))
}

// Convert Product fields from Prisma to strings
export function normalizeProduct(product: Product): Product {
	return {
		...product,
		price: product.price.toString(),
		rating: product.rating.toString(),
	}
}

export function formatNumberWithDecimalToString(number: number): string {
	if (isNaN(number) || !isFinite(number)) return '0.00'
	return number.toFixed(2) // returned string
}


