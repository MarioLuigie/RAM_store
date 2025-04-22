import { getProductBySlug } from '@/lib/actions/product.actions'
import { Product } from '@/lib/types/products.types'

export async function handleGetProductBySlug(slug: string): Promise<IDataResult<Product>> {
	console.log(slug)
	const result = await getProductBySlug(slug)
  return result
}
