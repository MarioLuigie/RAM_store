// modules
import { z } from 'zod';
// lib
import { OrderItemSchema, OrderSchema } from '@/lib/utils/validators';

export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Order = z.infer<typeof OrderSchema> & {
	id: string;
	createdAt: Date;
	isPaid: boolean;
	paidAt: Date | null;
	isDelivered: boolean;
	deliveredAt: Date | null;
	orderitems: OrderItem[];
	user: { name: string; email: string };
};
