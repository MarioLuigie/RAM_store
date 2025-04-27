import { z } from 'zod'
import { CartItemSchema, CartSchema } from '@/lib/utils/validators'

// TYPE FOR CART IN APP
export type Cart = z.infer<typeof CartSchema>
export type CartItem = z.infer<typeof CartItemSchema>
