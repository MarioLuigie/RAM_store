import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product } from '@/lib/types/products.types'
import { Product as PrismaProduct } from '@prisma/client'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert prisma object into regular JS object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

// Convert Product fields from Prisma to strings
export function normalizeProduct(product: PrismaProduct): Product {
  return {
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
  }
}

export function formatNumberWithDecimal(number: number): string {
  const [int, decimal] = number.toString().split(".")
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`
}
