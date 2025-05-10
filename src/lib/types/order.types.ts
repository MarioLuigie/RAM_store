// modules
import { z } from 'zod';
// lib
import {
	OrderItemSchema,
	OrderSchema,
} from '@/lib/utils/validators';

export type Order = z.infer<typeof OrderSchema>
export type OrderItem = z.infer<typeof OrderItemSchema>
