'use server'

import { PrismaClient } from "@prisma/client"
import { convertToPlainObject } from '@/lib/utils'

// GET LATEST PRODUCTS
export async function getLatestProducts() {
  const prisma = new PrismaClient()

  const data = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc"}
  }) // data is a prisma object

  return data
}
