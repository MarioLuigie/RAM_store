'use client';
// modules
import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { Check } from 'lucide-react';
import { useTransition } from 'react';
// lib
import { Order } from '@/lib/types/order.types';
import { formatDateTime, formatId } from '@/lib/utils/utils';
import { PaymentMethod } from '@/lib/constants/enums';
import { useCustomToast } from '@/lib/hooks/useCustomToast';
import {
	handleCreatePayPalOrder,
	handleApprovePayPalOrder,
} from '@/lib/handlers/payment.handlers';
import {
	updateOrderToPaidCOD,
	updateOrderToDeliveredCOD,
} from '@/lib/actions/payment.actions';
import { CURRENCY_CODES, PAYPAL_LOCALE_CODES } from '@/lib/constants';
// components
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import OrderItemsTable from '@/components/tables/OrderItemsTable';
import OrderPrices from '@/components/content/OrderPrices';
import { Button } from '@/components/ui/button';

export default function OrderDetails({
	order,
	paypalClientId,
	isAdmin,
}: {
	order: Order;
	paypalClientId: string;
	isAdmin: boolean;
}) {
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

	const { showCustomToast } = useCustomToast();
	const {} = useTransition();

	const PrintLoadingState = () => {
		const [{ isPending, isRejected }] = usePayPalScriptReducer();
		let status = '';
		if (isPending) {
			status = 'Loading PayPal...';
		} else if (isRejected) {
			status = 'Error loading PayPal...';
		}
		return status;
	};

	// Button to mark order as paid
	const MarkAsPaidButton = () => {
		const [isPending, startTransition] = useTransition();

		return (
			<Button
				type="button"
				disabled={isPending}
				onClick={() =>
					startTransition(async () => {
						const { success, message } = await updateOrderToPaidCOD(
							order.id
						);
						showCustomToast(message, success);
					})
				}
			>
				{isPending ? 'processing...' : 'Mark As Paid'}
			</Button>
		);
	};

	// Button to mark order as delivered
	const MarkAsDeliveredButton = () => {
		const [isPending, startTransition] = useTransition();

		return (
			<Button
				type="button"
				disabled={isPending}
				onClick={() =>
					startTransition(async () => {
						const { success, message } = await updateOrderToDeliveredCOD(
							order.id
						);
						showCustomToast(message, success);
					})
				}
			>
				{isPending ? 'processing...' : 'Mark As Delivered'}
			</Button>
		);
	};

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
									<div className="flex items-center gap-2">
										<Badge variant="secondary">
											Paid at {formatDateTime(paidAt!).dateTime}
										</Badge>
										<Check />
									</div>
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
									<div className="flex items-center gap-2">
										<Badge variant="secondary">
											Delivered at{' '}
											{formatDateTime(deliveredAt!).dateTime}
										</Badge>
										<Check />
									</div>
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
				</div>

				{/* ORDER PRICES CARD*/}
				<div>
					<Card>
						<CardContent className="p-4 gap-4 space-y-4">
							<OrderPrices
								itemsPrice={itemsPrice}
								shippingPrice={shippingPrice}
								taxPrice={taxPrice}
								totalPrice={totalPrice}
							/>
							{/* PAYPAL PAYMENT BUTTON */}
							{!isPaid && paymentMethod === PaymentMethod.PAYPAL && (
								<div className="mt-8">
									<PayPalScriptProvider
										options={{
											clientId: paypalClientId,
											currency: CURRENCY_CODES.main,
											locale: PAYPAL_LOCALE_CODES.main,
										}}
									>
										<PrintLoadingState />
										<PayPalButtons
											createOrder={() =>
												handleCreatePayPalOrder(id, showCustomToast)
											}
											onApprove={(data) =>
												handleApprovePayPalOrder(
													id,
													data,
													showCustomToast
												)
											}
										/>
									</PayPalScriptProvider>
								</div>
							)}

							{/* COD - CASH ON DELIVERY PAYMENT*/}
							{isAdmin &&
								!isPaid &&
								paymentMethod === PaymentMethod.CASH_ON_DELIVERY && (
									<MarkAsPaidButton />
								)}

							{/* COD - CASH ON DELIVERY - DELIVERY*/}
							{isAdmin && isPaid && !isDelivered && (
								<MarkAsDeliveredButton />
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}
