'use client';
// lib
import { Order } from '@/lib/types/order.types';
import { formatDateTime, formatId } from '@/lib/utils/utils';
// components
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import OrderItemsTable from '@/components/content/OrderItemsTable';
import OrderPrices from '@/components/content/OrderPrices';

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
							<div className="mt-2">
								{isPaid ? (
									<Badge variant="secondary">
										Paid at {formatDateTime(paidAt!).dateTime}
									</Badge>
								) : (
									<Badge variant="destructive">Not paid</Badge>
								)}
							</div>
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
							<div className="mt-2">
								{isDelivered ? (
									<Badge variant="secondary">
										Delivered at{' '}
										{formatDateTime(deliveredAt!).dateTime}
									</Badge>
								) : (
									<Badge variant="destructive">Not delivered</Badge>
								)}
							</div>
						</CardContent>
					</Card>

					{/* ORDER ITEMS TABLE*/}
					<Card>
						<CardContent className="p-4 gap-4">
							<OrderItemsTable items={orderitems} />
						</CardContent>
					</Card>

					{/* ORDER PRICES CARD*/}
					<Card>
						<CardContent className="p-4 gap-4 space-y-4">
							<OrderPrices
								itemsPrice={itemsPrice}
								shippingPrice={shippingPrice}
								taxPrice={taxPrice}
								totalPrice={totalPrice}
							/>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}
