'use server';
// modules
import { revalidatePath } from 'next/cache';
// lib
import { PaymentResult } from '@/lib/types/payment.types';
import { paypal } from '@/lib/payments/paypal';
import { formatErrorMessages } from '@/lib/utils/server';
import { prisma } from '@/lib/db/prisma';
import { PayPalStatus } from '@/lib/constants/enums';
import { ROUTES } from '@/lib/constants/paths';

// P-A-Y-P-A-L
// CREATE NEW PAYPAL ORDER
export async function createPayPalOrder(orderId: string) {
	try {
		// Get order from db
		const order = await prisma.order.findFirst({
			where: { id: orderId }
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
		orderID: string;
	}
) {
	try {
		// Get order from db
		const order = await prisma.order.findFirst({
			where: { id: orderId },
		});

		if (!order) throw new Error('Order not found');

		const captureData = await paypal.capturePayment(data.orderID);

		if (
			!captureData ||
			captureData.id !== (order.paymentResult as PaymentResult)?.id ||
			captureData.status !== PayPalStatus.COMPLETED
		) {
			throw new Error('Error in PayPal payment');
		}

		// Update order to paid in db (isPaid, paidAt - to update)
		await updateOrderToPaid({
			orderId,
			paymentResult: {
				id: captureData.id,
				status: captureData.status,
				email_address: captureData.payer.email_address,
				pricePaid:
					captureData.purchase_units.payments?.captures[0]?.amount?.value,
			},
		});

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
	console.log(paymentResult);
	// Get order from db
	const order = await prisma.order.findFirst({
		where: { id: orderId },
		include: {
			orderitems: true,
		},
	});

	if (!order) throw new Error('Order not found');

	if (order.isPaid) throw new Error('Order is already paid');

	// Transaction for update order and account for product stock
	await prisma.$transaction(async (tx) => {
		// Iterate over products and update stock
		for (const item of order.orderitems) {
			await tx.product.update({
				where: { id: item.productId },
				data: {
					stock: { increment: -item.qty },
				},
			});
		}

		// Set the order to paid
		await tx.order.update({
			where: { id: order.id },
			data: {
				isPaid: true,
				paidAt: new Date(),
				paymentResult,
			},
		});
	});

	// Get updated order after transaction
	const updatedOrder = await prisma.order.findFirst({
		where: { id: orderId },
		include: {
			orderitems: true,
			user: {
				select: {
					name: true,
					email: true,
				},
			},
		},
	});

	if (!updatedOrder) throw new Error('Order not found');
}

//UPDATE COD ORDER TO PAID
export async function updateOrderToPaidCOD(orderId: string) {
	try {
		await updateOrderToPaid({ orderId });
		revalidatePath(`${ROUTES.ORDER}/${orderId}`);
		return {
			success: true,
			message: 'Order marked as paid',
		};
	} catch (error) {
		return {
			success: false,
			message: formatErrorMessages(error),
		};
	}
}

//UPDATE COD ORDER TO DELIVERD
export async function updateOrderToDeliverCOD(orderId: string) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new Error('Order not found');
    if (!order.isPaid) throw new Error('Order is not paid');

    await prisma.order.update({
      where: { id: orderId },
      data: {
        isDelivered: true,
        deliveredAt: new Date(),
      },
    });

		revalidatePath(`${ROUTES.ORDER}/${orderId}`);

    return {
      success: true,
      message: 'Order has been marked delivered',
    };
  } catch (error) {
    return { success: false, message: formatErrorMessages(error) };
  }
}

// S-T-R-I-P-E

// Example captured payment for order captureData
// {
// 	"id": "5O190127TN364715T",
// 	"status": "COMPLETED",
// 	"payment_source": {
// 	"paypal": {
// 	"name": {
// 	"given_name": "John",
// 	"surname": "Doe"
// 	},
// 	"email_address": "customer@example.com",
// 	"account_id": "QYR5Z8XDVJNXQ"
// 	}
// 	},
// 	"purchase_units": [
// 	{
// 	"reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b",
// 	"shipping": {
// 	"address": {
// 	"address_line_1": "2211 N First Street",
// 	"address_line_2": "Building 17",
// 	"admin_area_2": "San Jose",
// 	"admin_area_1": "CA",
// 	"postal_code": "95131",
// 	"country_code": "US"
// 	}
// 	},
// 	"payments": {
// 	"captures": [
// 	{
// 	"id": "3C679366HH908993F",
// 	"status": "COMPLETED",
// 	"amount": {
// 	"currency_code": "USD",
// 	"value": "100.00"
// 	},
// 	"seller_protection": {
// 	"status": "ELIGIBLE",
// 	"dispute_categories": [
// 	"ITEM_NOT_RECEIVED",
// 	"UNAUTHORIZED_TRANSACTION"
// 	]
// 	},
// 	"final_capture": true,
// 	"disbursement_mode": "INSTANT",
// 	"seller_receivable_breakdown": {
// 	"gross_amount": {
// 	"currency_code": "USD",
// 	"value": "100.00"
// 	},
// 	"paypal_fee": {
// 	"currency_code": "USD",
// 	"value": "3.00"
// 	},
// 	"net_amount": {
// 	"currency_code": "USD",
// 	"value": "97.00"
// 	}
// 	},
// 	"create_time": "2018-04-01T21:20:49Z",
// 	"update_time": "2018-04-01T21:20:49Z",
// 	"links": [
// 	{
// 	"href": "https://api-m.paypal.com/v2/payments/captures/3C679366HH908993F",
// 	"rel": "self",
// 	"method": "GET"
// 	},
// 	{
// 	"href": "https://api-m.paypal.com/v2/payments/captures/3C679366HH908993F/refund",
// 	"rel": "refund",
// 	"method": "POST"
// 	}
// 	]
// 	}
// 	]
// 	}
// 	}
// 	],
// 	"payer": {
// 	"name": {
// 	"given_name": "John",
// 	"surname": "Doe"
// 	},
// 	"email_address": "customer@example.com",
// 	"payer_id": "QYR5Z8XDVJNXQ"
// 	},
// 	"links": [
// 	{
// 	"href": "https://api-m.paypal.com/v2/checkout/orders/5O190127TN364715T",
// 	"rel": "self",
// 	"method": "GET"
// 	}
// 	]
// 	}