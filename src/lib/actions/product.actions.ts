'use server';
// modules
// import { PrismaClient, Prisma } from '@prisma/client'
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db/prisma'; // global app prisma client
// lib
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from '@/lib/constants';
import {
	safeNormalizeProducts,
	safeNormalizeProduct,
	formatErrorMessages,
} from '@/lib/utils/server';
import {
	CreateProduct,
	Product,
	ProductImage,
	UpdateProduct,
} from '@/lib/types/products.types';
import { revalidatePath } from 'next/cache';
import { ROUTES } from '@/lib/constants/paths';
import { CreateProductSchema, UpdateProductSchema } from '../utils/validators';

// CREATE PRISMA CLIENT
// const prisma = new PrismaClient()

// GET LATEST PRODUCTS
export async function getLatestProducts(): Promise<IDataResult<Product[]>> {
	try {
		// PRODUCTS WITH PRISMA TYPES
		const data = await prisma.product.findMany({
			take: LATEST_PRODUCTS_LIMIT,
			orderBy: { createdAt: 'desc' },
		});

		return {
			success: true,
			data: safeNormalizeProducts(data),
		};
	} catch (error: unknown) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			console.error('Prisma error:', error.message, error.code);
		} else if (error instanceof Error) {
			console.error('General error:', error.message);
		} else {
			console.error('Unknown error:', error);
		}

		return {
			success: false,
			data: [] as Product[],
		}; // DONT RETURN EMPTY OBJECT FORCED AS Product type!
	}
}

// GET SINGLE PRODUCT BY SLUG
export async function getProductBySlug(
	slug: string
): Promise<IDataResult<Product>> {
	try {
		const data = await prisma.product.findFirst({
			where: { slug: slug },
		});

		if (!data) {
			throw new Error(`Product with slug "${slug}" not found`);
		}

		return {
			success: true,
			data: safeNormalizeProduct(data),
		};
	} catch (error: unknown) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			console.error('Prisma error:', error.message, error.code);
		} else if (error instanceof Error) {
			console.error('General error:', error.message);
		} else {
			console.error('Unknown error:', error);
		}

		return {
			success: false,
			data: {} as Product,
		}; // DONT RETURN EMPTY OBJECT FORCED AS Product type!
	}
}

// GET PRODUCTS BY SLUG
export async function getProductsBySlugs(
	slugs: string[]
): Promise<IDataResult<Product[]>> {
	try {
		const data = await prisma.product.findMany({
			where: {
				slug: {
					in: slugs,
				},
			},
		});

		if (!data || data.length === 0) {
			throw new Error(`No products found for the provided slugs`);
		}

		const normalized = data.map((item) => safeNormalizeProduct(item));

		return {
			success: true,
			data: normalized,
		};
	} catch (error: unknown) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			console.error('Prisma error:', error.message, error.code);
		} else if (error instanceof Error) {
			console.error('General error:', error.message);
		} else {
			console.error('Unknown error:', error);
		}

		return {
			success: false,
			data: [],
		};
	}
}

// GET ALL PRODUCTS
export async function getProducts({
	page,
	query,
	category,
	limit = PAGE_SIZE,
}: {
	page: number;
	query: string;
	category: string;
	limit?: number;
}) {
	try {
		console.log(page, query, category, limit);

		const products = await prisma.product.findMany({
			orderBy: { createdAt: 'desc' },
			skip: (page - 1) * limit,
			take: limit,
		});

		const productsCount = await prisma.product.count();

		const totalPages = Math.ceil(productsCount / limit);

		return {
			success: true,
			data: {
				products,
				totalPages,
			},
			message: 'Products found successfully',
		};
	} catch (error) {
		return {
			success: false,
			message: formatErrorMessages(error),
		};
	}
}

// DELETE PRODUCT
export async function deleteProduct(productId: string) {
	try {
		const productToDelete = await prisma.product.findFirst({
			where: { id: productId },
		});

		if (!productToDelete) throw new Error('Product not found');

		await prisma.product.delete({
			where: { id: productId },
		});

		revalidatePath(ROUTES.ADMIN_PRODUCTS);

		const deleteRequests = (productToDelete.images as ProductImage[]).map(
			(image) =>
				fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/uploadthing/delete`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ key: image.key }),
				})
		);

		await Promise.all(deleteRequests);

		return {
			success: true,
			message: 'Product deleted successfully',
		};
	} catch (error) {
		return {
			success: false,
			message: formatErrorMessages(error),
		};
	}
}

// CREATE PRODUCT
export async function createProduct(data: CreateProduct) {
	try {
		const product = CreateProductSchema.parse(data);
		await prisma.product.create({
			data: product,
		});

		revalidatePath(ROUTES.ADMIN_PRODUCTS);

		return {
			success: true,
			message: 'Product created successfully',
		};
	} catch (error) {
		return {
			success: false,
			message: formatErrorMessages(error),
		};
	}
}

// UPDATE PRODUCT
export async function updateProduct(data: UpdateProduct) {
	try {
		const product = UpdateProductSchema.parse(data);

		const productExists = await prisma.product.findFirst({
			where: { id: product.id },
		});

		if (!productExists) throw new Error('Product not found');

		await prisma.product.update({
			where: { id: product.id },
			data: product,
		});

		revalidatePath(ROUTES.ADMIN_PRODUCTS);
		return {
			success: true,
			message: 'Product updated successfully',
		};
	} catch (error) {
		return {
			success: false,
			message: formatErrorMessages(error),
		};
	}
}
