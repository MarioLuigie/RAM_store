'use server';
// modules
// import { prisma } from '@/lib/db/prisma'
import { cookies } from 'next/headers';
// lib
import { CartItem } from '@/lib/types/cart.types';
import { SESSION_CART_ID } from '@/lib/constants';
import { auth } from '@/config/auth';
import { prisma } from '../db/prisma';
import { convertToPlainObject } from '@/lib/utils/utils';
import { CartItemSchema } from '@/lib/utils/validators';

export async function addToCart(cartItem: CartItem) {
	console.log(cartItem);

	try {
		// Check if session cart id string exists in cookie value on client side
		const sessionCartId = (await cookies()).get(SESSION_CART_ID)?.value;
		if (!sessionCartId) {
			throw new Error('Session cart id cookie not found');
		}

		// Check if user is logged and create userId with session.user.id or with undefined when user is not logged
		const session = await auth();
		const userId = session?.user?.id ? session.user.id : undefined;

		// Get the cart => return cart or undefined
		const cart = await getCart();

		// Parse and validate data - cart item sended to addToCart() server action
		const validatedCartItem = CartItemSchema.parse(cartItem);

		// Find product in database
		const product = await prisma.product.findFirst({
			where: { id: validatedCartItem.productId },
		});

		

		console.log({
			sessionCartId,
			userId,
			cart,
			validatedCartItem,
			product,
		});

		if (true) {
			return {
				success: true,
				data: { name: cartItem.name, image: cartItem.image } as CartItem, // Only tests!
				message: 'Successfully added to the Cart',
			};
		} else {
			return {
				success: false,
				data: { name: cartItem.name, image: cartItem.image } as CartItem, // Only tests!
				message: 'Not added to the Cart',
			};
		}
	} catch (error) {
		console.log(error);
		return {
			success: false,
			data: { name: cartItem.name, image: cartItem.image } as CartItem, // Only tests!
			message: 'Not added to the Cart',
		};
	}
}

export async function getCart() {
	// Check if session cart id string exists in cookie value on client side
	const sessionCartId = (await cookies()).get(SESSION_CART_ID)?.value;
	if (!sessionCartId) {
		throw new Error('Session cart id cookie not found');
	}

	// Check if user is logged and create userId with session.user.id or with undefined when user is not logged
	const session = await auth();
	const userId = session?.user?.id ? session.user.id : undefined;

	// Get the cart
	const cart = await prisma.cart.findFirst({
		where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
	});
	if (!cart) return undefined;

	return convertToPlainObject({
		...cart,
		items: cart.items as CartItem[],
		itemsPrice: cart.itemsPrice.toString(),
		shippingPrice: cart.shippingPrice.toString(),
		taxPrice: cart.taxPrice.toString(),
		totalPrice: cart.totalPrice.toString(),
	});
}

// 'use server';
// // modules
// // import { prisma } from '@/lib/db/prisma'
// import { cookies } from 'next/headers';
// // lib
// import { CartItem } from '@/lib/types/cart.types';
// import { SESSION_CART_ID } from '@/lib/constants';

// export async function addToCart(item: CartItem) {
// 	console.log(item);

// 	try {
// 		let sessionCartId = (await cookies()).get(SESSION_CART_ID)?.value;

// 		if (!sessionCartId) {
// 			// Middleware nie zadziałał — zabezpieczamy się
// 			sessionCartId = crypto.randomUUID();
// 			(await cookies()).set({
// 				name: SESSION_CART_ID,
// 				value: sessionCartId,
// 				path: '/',
// 				maxAge: 60 * 60 * 24 * 30,
// 				httpOnly: true,
// 				sameSite: 'lax',
// 			});
// 		}

// 		if (true) {
// 			return {
// 				success: true,
// 				data: { name: item.name, image: item.image } as CartItem, // Only tests!
// 				message: 'Successfully added to the Cart',
// 			};
// 		} else {
// 			return {
// 				success: false,
// 				data: { name: item.name, image: item.image } as CartItem, // Only tests!
// 				message: 'Not added to the Cart',
// 			};
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		return {
// 			success: false,
// 			data: { name: item.name, image: item.image } as CartItem, // Only tests!
// 			message: 'Not added to the Cart',
// 		};
// 	}
// }

// 'use server'

// import { prisma } from '@/lib/db/prisma'
// import { cookies } from 'next/headers'

// export async function addToCart(productId: string, quantity = 1) {
//   const cookieStore = cookies()
//   let sessionCartId = cookieStore.get('sessionCartId')?.value

//   // 🧪 Jeśli nie ma cookie — tworzymy awaryjnie
//   if (!sessionCartId) {
//     sessionCartId = crypto.randomUUID()
//     cookieStore.set('sessionCartId', sessionCartId, {
//       path: '/',
//       maxAge: 60 * 60 * 24 * 30, // 30 dni
//     })
//   }

//   // 🔍 Szukamy koszyka
//   let cart = await prisma.cart.findUnique({
//     where: { sessionCartId },
//   })

//   // 🛒 Tworzymy, jeśli nie istnieje
//   if (!cart) {
//     cart = await prisma.cart.create({
//       data: {
//         sessionCartId,
//         items: [],
//         itemsPrice: 0,
//         shippingPrice: 0,
//         taxPrice: 0,
//         totalPrice: 0,
//       },
//     })
//   }

//   // 🔁 Sprawdzamy, czy produkt już jest w koszyku
//   const existingItemIndex = cart.items.findIndex(
//     (item: any) => item.productId === productId
//   )

//   const updatedItems = [...cart.items]

//   if (existingItemIndex !== -1) {
//     // 🧮 Zwiększamy ilość
//     updatedItems[existingItemIndex].quantity += quantity
//   } else {
//     // ➕ Dodajemy nowy produkt
//     updatedItems.push({ productId, quantity })
//   }

//   // 💾 Aktualizacja koszyka
//   await prisma.cart.update({
//     where: { id: cart.id },
//     data: {
//       items: updatedItems,
//     },
//   })

//   return { success: true }
// }
