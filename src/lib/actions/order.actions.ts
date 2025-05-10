'use server';
// modules
import { isRedirectError } from 'next/dist/client/components/redirect-error';
// lib
import { auth } from '@/config/auth';
import { formatErrorMessages } from '@/lib/utils/server';
import { getCart } from '@/lib/actions/cart.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { ROUTES } from '../constants/paths';
import { OrderSchema } from '../utils/validators';
import { prisma } from '@/lib/db/prisma';
import { CartItem } from '../types/cart.types';

// CREATE ORDER AND ORDER ITEMS
export async function createOrder() {
	try {
		const session = await auth();

		if (!session) throw new Error('User is not authenticated');

		const cart = await getCart();

		const userId = session?.user?.id;

		if (!userId) throw new Error('User not found');

		const { data: user } = await getUserById(userId);

		if (!cart || cart.items.length === 0) {
			return {
				success: false,
				message: 'Your cart is empty',
				redirectTo: ROUTES.CART,
			};
		}

		if (!user.address) {
			return {
				success: false,
				message: 'No shipping address',
				redirectTo: ROUTES.SHIPPING_ADDRESS,
			};
		}

		if (!user.paymentMethod) {
			return {
				success: false,
				message: 'No payment method',
				redirectTo: ROUTES.PAYMENT_METHOD,
			};
		}

		// CREATE ORDER OBJECT
		const order = OrderSchema.parse({
			userId: user.id,
			shippingAddress: user.address,
			paymentMethod: user.paymentMethod,
			itemsPrice: cart.itemsPrice,
			shippingPrice: cart.shippingPrice,
			taxPrice: cart.taxPrice,
			totalPrice: cart.totalPrice,
		});

		// CREATE A TRANSACTION TO CREATE ORDER AND ORDER ITEMS IN DATABASE
		const insertedOrderId = await prisma.$transaction(async (tx) => {
			// Create order
			const insertedOrder = await tx.order.create({
				data: order,
			});

			// Create order items from cart items
			for (const item of cart.items as CartItem[]) {
				await tx.orderItem.create({
					data: {
						...item,
						price: item.price,
						orderId: insertedOrder.id,
					},
				});
			}

			// Clear cart
			await tx.cart.update({
				where: { id: cart.id },
				data: {
					items: [],
					itemsPrice: 0,
					shippingPrice: 0,
					taxPrice: 0,
					totalPrice: 0,
				},
			});

			return insertedOrder.id;
		});

    if (!insertedOrderId) throw new Error('Order not created');

		return {
			success: true,
			message: 'Order created successfully',
      redirectTo: `${ROUTES.ORDER}/${insertedOrderId}`,
		};

	} catch (error) {
		if (isRedirectError(error)) throw new Error();
		return {
			success: false,
			message: formatErrorMessages(error),
		};
	}
}
