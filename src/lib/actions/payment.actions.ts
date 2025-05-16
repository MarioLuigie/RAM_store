'use server';
// modules
import { revalidatePath } from 'next/cache';
// lib
import { PaymentResult } from '@/lib/types/payment.types';
import { paypal } from '@/lib/payments/paypal';
import { formatErrorMessages } from '@/lib/utils/server';
import { prisma } from '@/lib/db/prisma';
import { PayPalStatus } from '@/lib/constants/enums';
import { ROUTES } from '../constants/paths';

// P-A-Y-P-A-L
// CREATE NEW PAYPAL ORDER
export async function createPayPalOrder(orderId: string) {
	try {
		// Get order from db
		const order = await prisma.order.findFirst({
			where: { id: orderId },
		});

		if (order) {
			// Create paypal order
			const paypalOrder = await paypal.createOrder(Number(order.totalPrice));

			// Update order with paypal order id
			await prisma.order.update({
				where: { id: orderId },
				data: {
					paymentResult: {
						id: paypalOrder.id,
						email_address: '',
						status: '',
						pricePaid: 0,
					},
				},
			});

			return {
				success: true,
				data: paypalOrder.id,
				message: 'Item order created successfully',
			};
		} else {
			throw new Error('Order not found');
		}
	} catch (error) {
		return {
			success: false,
			message: formatErrorMessages(error),
		};
	}
}

// APPROVE PAYPAL ORDER AND UPDATE ORDER TO PAID
export async function approvePayPalOrder(
	orderId: string,
	data: {
		paypalOrderId: string;
	}
) {
	try {
		// Get order from db
		const order = await prisma.order.findFirst({
			where: { id: orderId },
		});

		if (!order) throw new Error('Order not found');

		const captureData = await paypal.capturePayment(data.paypalOrderId);

		if (
			!captureData ||
			captureData.id !== (order.paymentResult as PaymentResult)?.id ||
			captureData.status !== PayPalStatus.COMPLETED
		) {
			throw new Error('Error in PayPal payment');
		}

		// Update order to paid in db (isPaid, paidAt - to update)
		// @todo

		revalidatePath(`${ROUTES.ORDER}/${orderId}`);

		return {
			success: true,
			message: 'Order has been paid',
		};
	} catch (error) {
		return {
			success: false,
			message: formatErrorMessages(error),
		};
	}
}

// UPDATE ORDER TO PAID
export async function updateOrderToPaid({
	orderId,
	paymentResult,
}: {
	orderId: string;
	paymentResult?: PaymentResult;
}) {
	// Get order from db
	const order = await prisma.order.findFirst({
		where: { id: orderId },
		include: {
			orderitems: true,
		},
	});

	if (!order) throw new Error('Order not found');

	if (order.isPaid) throw new Error('Order is already paid');

	// Transaction
}

// S-T-R-I-P-E
