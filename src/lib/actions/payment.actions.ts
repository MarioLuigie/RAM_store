'use server';
// modules
// import { revalidatePath } from 'next/cache';
// lib
// import { PaymentResult } from '@/lib/types/payment.types';
import { paypal } from '@/lib/payments/paypal';
import { formatErrorMessages } from '@/lib/utils/server';
import { prisma } from '@/lib/db/prisma';

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
