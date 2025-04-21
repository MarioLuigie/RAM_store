'use server'
// modules
import { PrismaClient } from '@prisma/client'
// lib
// import { convertToPlainObject } from '@/lib/utils'
import { LATEST_PRODUCTS_LIMIT } from '@/lib/constants'

// GET LATEST PRODUCTS
export async function getLatestProducts() {
	const prisma = new PrismaClient()

	const data = await prisma.product.findMany({
		take: LATEST_PRODUCTS_LIMIT,
		orderBy: { createdAt: 'desc' },
	})

	const products = data.map((product) => ({
		...product,
		price: product.price.toNumber(),
		rating: product.rating.toNumber(),
	}))

	return products
}
