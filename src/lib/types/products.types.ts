import { z } from 'zod'
import { InsertProductSchema } from '@/lib/utils/validators'

// TYPE FOR PRODUCT IN APP
export type Product = z.infer<typeof InsertProductSchema> & {
  id: string
  rating: string
  createdAt: Date
}

