'use server'
// modules
// import { PrismaClient, Prisma } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db/prisma' // global prisma client
// lib
import { LATEST_PRODUCTS_LIMIT } from '@/lib/constants'
import { safeNormalizeProducts } from '@/lib/utils/server'
import { Product } from '@/lib/types/products.types'

// CREATE PRISMA CLIENT
// const prisma = new PrismaClient()

// GET LATEST PRODUCTS
export async function getLatestProducts(): Promise<IDataResult<Product[]>> {
	try {
		// PRODUCTS WITH PRISMA TYPES
		const data = await prisma.product.findMany({
			take: LATEST_PRODUCTS_LIMIT,
			orderBy: { createdAt: 'desc' },
		})

		return {
			success: true,
			data: safeNormalizeProducts(data),
		}
	} catch (error: unknown) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			console.error('Prisma error:', error.message, error.code)
		} else if (error instanceof Error) {
			console.error('General error:', error.message)
		} else {
			console.error('Unknown error:', error)
		}

		return {
			success: false,
			data: [] as Product[],
		} // DONT RETURN EMPTY OBJECT FORCED AS Product type!
	}
}

// GET SINGLE PRODUCT ITS SLUG
export async function getProductBySlug(
	slug: string
): Promise<IDataResult<Product>> {
	try {
		const data = await prisma.product.findFirst({
			where: { slug: slug },
		})

		if (!data) {
			throw new Error(`Product with slug "${slug}" not found`)
		}

		return {
			success: true,
			data,
		}

	} catch (error: unknown) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			console.error('Prisma error:', error.message, error.code)
		} else if (error instanceof Error) {
			console.error('General error:', error.message)
		} else {
			console.error('Unknown error:', error)
		}

		return {
			success: false,
			data: {} as Product,
		} // DONT RETURN EMPTY OBJECT FORCED AS Product type!
	}
}
