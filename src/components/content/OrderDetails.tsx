'use client';

import { Order } from '@/lib/types/order.types';
import { formatDateTime, formatId } from '@/lib/utils/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '../ui/badge';

export default function OrderDetails({ order }: { order: Order }) {
	const {
		id,
		orderitems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		shippingPrice,
		taxPrice,
		totalPrice,
		isDelivered,
		isPaid,
		paidAt,
		deliveredAt,
	} = order;

	return (
		<>
			<h1 className="py-4 text-2xl">Order {formatId(id)}</h1>
			<div className="grid md:grid-cols-3 md:gap-5">
				<div className="col-span-2 space-y-4 overflow-x-auto">
					{/* PAYMENT METHOD */}
					<Card>
						<CardContent className="p-4 gap-4">
							<h2 className="text-xl pb-4">Payment Method</h2>
							<p>{paymentMethod}</p>
							{isPaid ? (
								<Badge variant="secondary">
									Paid at {formatDateTime(paidAt!).dateTime}
								</Badge>
							) : (
								<Badge variant="destructive">Not paid</Badge>
							)}
						</CardContent>
					</Card>

					{/* SHIPPING ADDRESS */}
					<Card>
						<CardContent className="p-4 gap-4">
							<h2 className="text-xl pb-4">Shipping Address</h2>
							<p>{shippingAddress.fullName}</p>
							<p>
								{shippingAddress.streetAddress}, {shippingAddress.city}
							</p>
							<p>
								{shippingAddress.postalCode}, {shippingAddress.country}
							</p>
							{isDelivered ? (
								<Badge variant="secondary">
									Delivered at {formatDateTime(deliveredAt!).dateTime}
								</Badge>
							) : (
								<Badge variant="destructive">Not delivered</Badge>
							)}
						</CardContent>
					</Card>

					{/* ORDER ITEMS */}
					<Card>
						<CardContent className="p-4 gap-4">
							<h2 className="text-xl pb-4">Order Items</h2>
							
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}
