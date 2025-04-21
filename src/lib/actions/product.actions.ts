'use server'

import { PrismaClient } from '@prisma/client'
// import { convertToPlainObject } from '@/lib/utils'

// GET LATEST PRODUCTS
export async function getLatestProducts() {
	const prisma = new PrismaClient()

	const data = await prisma.product.findMany({
		take: 4,
		orderBy: { createdAt: 'desc' },
	})

	console.log('DATA FROM PRISMA', data)

	const products = data.map((product) => ({
		...product,
		price: product.price.toNumber(),
		rating: product.rating.toNumber(),
	}))

	console.log('PRODUCTS WITH FILDS CONVERTED INTO NUMBERS', products)

	return products
}
