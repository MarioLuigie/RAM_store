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
import { convertToPlainObject } from '../utils/utils';
import { PAGE_SIZE } from '../constants';
import { Order } from '../types/order.types';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
// import { ShippingAddress } from '../types/shipping.types';

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

// GET ORDER BY ID
export async function getOrderById(orderId: string) {
	try {
		console.log(orderId);

		const data = await prisma.order.findFirst({
			where: { id: orderId },
			include: {
				orderitems: true,
				user: {
					select: { name: true, email: true },
				},
			},
		});

		const order = convertToPlainObject(data);

		return {
			success: true,
			data: order,
			message: 'Order found with successfully',
		};
	} catch (error) {
		return {
			success: false,
			data: null,
			message: formatErrorMessages(error),
		};
	}
}

// GET USER`S ORDERS
// export async function getOrders({
// 	limit = PAGE_SIZE,
// 	page,
// }: {
// 	limit?: number;
// 	page: number;
// }) {
// 	try {
// 		const session = await auth();

// 		if (!session) throw new Error('User is not authenticated');

// 		// Orders list
// 		const orders = await prisma.order.findMany({
// 			where: { userId: session?.user?.id },
// 			orderBy: {
// 				createdAt: 'desc',
// 			},
// 			take: limit,
// 			skip: (page - 1) * limit,
// 		});

// 		// Orders number
// 		const dataCount = await prisma.order.count({
// 			where: { userId: session?.user?.id },
// 		});

// 		const totalPages = Math.ceil(dataCount / limit);

// 		return {
// 			success: true,
// 			data: {
// 				orders,
// 				totalPages,
// 			},
// 			message: 'Orders founded successfully',
// 		};
// 	} catch (error) {
// 		return {
// 			success: false,
// 			message: formatErrorMessages(error),
// 		};
// 	}
// }

// GET USER ORDERS - ONLY TO USER PANEL
export async function getOrders({
	limit = PAGE_SIZE,
	page,
}: {
	limit?: number;
	page: number;
}) {
	try {
		const session = await auth();

		if (!session || !session.user?.id) {
			throw new Error('User is not authenticated');
		}

		// Pobierz zamówienia
		const ordersFromDb = await prisma.order.findMany({
			where: { userId: session.user.id },
			orderBy: { createdAt: 'desc' },
			take: limit,
			skip: (page - 1) * limit,
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

		// Przekonwertuj i zweryfikuj dane
		const typedOrders: Order[] = ordersFromDb.map((order) => {
			const parsed = OrderSchema.parse({
				userId: order.userId,
				paymentMethod: order.paymentMethod,
				shippingAddress: order.shippingAddress,
				itemsPrice: order.itemsPrice.toString(),
				shippingPrice: order.shippingPrice.toString(),
				taxPrice: order.taxPrice.toString(),
				totalPrice: order.totalPrice.toString(),
			});

			return {
				...parsed,
				id: order.id,
				createdAt: order.createdAt,
				isPaid: order.isPaid,
				paidAt: order.paidAt,
				isDelivered: order.isDelivered,
				deliveredAt: order.deliveredAt,
				orderitems: order.orderitems,
				user: order.user,
			};
		});

		const dataCount = await prisma.order.count({
			where: { userId: session.user.id },
		});

		const totalPages = Math.ceil(dataCount / limit);

		return {
			success: true,
			data: {
				orders: typedOrders,
				totalPages,
			},
			message: 'Orders fetched successfully',
		};
	} catch (error) {
		return {
			success: false,
			message: formatErrorMessages(error),
		};
	}
}

type SalesData = {
	month: string;
	totalSales: number;
}[];

// GET ALL ORDERS TO THE ADMIN PANEL
export async function getAllOrders({
	limit = PAGE_SIZE,
	page,
}: {
	limit?: number;
	page: number;
}) {
	try {
		const orders = await prisma.order.findMany({
			orderBy: { createdAt: 'desc' },
			take: limit,
			skip: (page - 1) * limit,
			include: { user: { select: { name: true } } },
		});

		const ordersCount = await prisma.order.count();

		const totalPages = Math.ceil(ordersCount / limit);

		return {
			success: true,
			data: {
				orders,
				totalPages,
			},
			message: 'Orders downloaded successfully',
		};
	} catch (error) {
		return {
			success: false,
			message: formatErrorMessages(error),
		};
	}
}

// GET ORDERS SUMMARY DATA FOR ADMIN
export async function getOrderSummary() {
	try {
		// Get counts for each resource
		const ordersCount = await prisma.order.count();
		const productsCount = await prisma.product.count();
		const usersCount = await prisma.user.count();

		// Calculate the total sales
		const totalSales = await prisma.order.aggregate({
			_sum: { totalPrice: true },
		});

		// Get monthly sales
		const salesDataRaw = await prisma.$queryRaw<
			Array<{ month: string; totalSales: Prisma.Decimal }>
		>`SELECT to_char("createdAt", 'MM/YY') as "month", sum("totalPrice") as "totalSales" FROM "Order" GROUP BY to_char("createdAt", 'MM/YY')`;

		const salesData: SalesData = salesDataRaw.map((entry) => ({
			month: entry.month,
			totalSales: Number(entry.totalSales),
		}));

		// Get latest sales
		const latestSales = await prisma.order.findMany({
			orderBy: { createdAt: 'desc' },
			include: {
				user: {
					select: {
						name: true,
					},
				},
			},
			take: 6,
		});

		return {
			success: true,
			data: {
				ordersCount,
				productsCount,
				usersCount,
				totalSales,
				latestSales,
				salesData,
			},
			message: 'Order summary created successfully',
		};
	} catch (error) {
		return {
			success: false,
			message: formatErrorMessages(error),
		};
	}
}

// DELETE ORDER
export async function deleteOrder(orderId: string) {
	try {
		await prisma.order.delete({
			where: { id: orderId },
		});

		revalidatePath(ROUTES.ADMIN_ORDERS);

		return {
			success: true,
			message: 'Order deleted successfully',
		};
	} catch (error) {
		return {
			success: false,
			message: formatErrorMessages(error),
		};
	}
}


