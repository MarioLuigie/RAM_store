'use client';

import { Order } from '@/lib/types/order.types';

export default function OrderDetailsTable({ order }: { order: Order }) {
	return <div>ORDER DETAILS TABLE {order.totalPrice}</div>;
}
