'use server'
// modules
import { PrismaClient } from '@prisma/client'
// lib
import { LATEST_PRODUCTS_LIMIT } from '@/lib/constants'
import { safeNormalizeProducts } from '@/lib/utils/server'
import { Product } from '@/lib/types/products.types'

// GET LATEST PRODUCTS
export async function getLatestProducts(): Promise<Product[]> {
	const prisma = new PrismaClient()

	// PRODUCTS WITH PRISMA TYPE
	const data = await prisma.product.findMany({
		take: LATEST_PRODUCTS_LIMIT,
		orderBy: { createdAt: 'desc' },
	})

	// const products = data.map((product) => ({
	// 	...product,
	// 	price: product.price.toNumber(),
	// 	rating: product.rating.toNumber(),
	// }))

	return safeNormalizeProducts(data)
}
