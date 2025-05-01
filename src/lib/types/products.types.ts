import { z } from 'zod'
import { ProductSchema } from '@/lib/utils/validators'

// TYPE FOR PRODUCT IN APP
export type Product = z.infer<typeof ProductSchema> & {
  id: string
  createdAt: Date
}

export type Prices = {
  itemsPrice: string
  shippingPrice: string
  taxPrice: string
  totalPrice: string
}
