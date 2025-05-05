import { z } from 'zod'
import { ShippingAddressSchema } from '@/lib/utils/validators'

export type ShippingAddress = z.infer<typeof ShippingAddressSchema>

