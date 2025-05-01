'use server';
// modules
// import { prisma } from '@/lib/db/prisma'
import { cookies } from 'next/headers';
// lib
import { Cart, CartItem } from '@/lib/types/cart.types';
import { SESSION_CART_ID } from '@/lib/constants';
import { auth } from '@/config/auth';
import { prisma } from '@/lib/db/prisma';
import { convertToPlainObject } from '@/lib/utils/utils';
import { CartItemSchema, CartSchema } from '@/lib/utils/validators';
import { calcPrices } from '@/lib/utils/utils';
import { revalidatePath } from 'next/cache';
import { ROUTES } from '@/lib/constants/paths';
import { formatErrorMessages } from '@/lib/utils/server';

// ADD TO CART
export async function addItemToCart(cartItem: CartItem) {
	console.log(cartItem);

	try {
		// Parse and validate data - cart item sended to addToCart() server action
		const validatedCartItem = CartItemSchema.parse(cartItem);

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

		// Find product in database
		const product = await prisma.product.findFirst({
			where: { id: validatedCartItem.productId },
		});

		if (!product) throw new Error('Product not found');

		if (!cart) {
			// Create and validate new cart and add validated cart item to cart items
			const validatedCart: Cart = CartSchema.parse({
				sessionCartId,
				userId,
				items: [validatedCartItem],
				...calcPrices([validatedCartItem]),
			});

			console.log('Created new cart in addToCart func', validatedCart);

			// Add created cart to the database
			await prisma.cart.create({
				data: validatedCart,
			});

			//Revalidate ProductDetailsPage path
			revalidatePath(`${ROUTES.PRODUCT}/${product.slug}`);

			return {
				success: true,
				data: validatedCartItem,
				message: 'Successfully added to the Cart',
			};
		} else {
			// Update existing cart pushing product to cart items
			// Check if item is already in cart
			const itemAlreadyExistingInCart = cart.items.find(
				(item) => item.productId === validatedCartItem.productId
			);

			if (itemAlreadyExistingInCart) {
				// Check the stock of product - type Product - therefore maybe there is not the product available on the stock - empty stock right now
				if (product.stock < itemAlreadyExistingInCart.qty + 1) {
					throw new Error('Not enough stock');
				}

				// Increase the quantity of validatedCartItem existing in cart
				cart.items.find(
					(item) => item.productId === validatedCartItem.productId
				)!.qty = itemAlreadyExistingInCart.qty + 1;
			} else {
				// Check the stock of product
				if (product.stock < 1) throw new Error('Not enough stock');

				// Add validated cart item to cart items
				cart.items.push(validatedCartItem);
			}

			// Update cart in database - cart already exists in db therefore is neseccery updating only items array of existing cart
			await prisma.cart.update({
				where: { id: cart.id },
				data: {
					items: cart.items,
					...calcPrices(cart.items),
				},
			});

			revalidatePath(`${ROUTES.PRODUCT}/${product.slug}`);

			return {
				success: true,
				data: {
					productId: validatedCartItem.productId,
					name: validatedCartItem.name,
					slug: validatedCartItem.slug,
					qty: validatedCartItem.qty,
					image: validatedCartItem.image,
					price: validatedCartItem.price,
				},
				message: 'Successfully added to the Cart',
			};
		}
	} catch (error) {
		console.log(error);
		return {
			success: false,
			data: {
				productId: cartItem.productId,
				name: cartItem.name,
				slug: cartItem.slug,
				qty: cartItem.qty,
				image: cartItem.image,
				price: cartItem.price,
			},
			message: 'Not added to the Cart',
		};
	}
}

// GET CART
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

	// If cart does not exist return undefined
	if (!cart) return undefined;

	// If cart exists return plained cart with converted fields from prisma decimal to string
	return convertToPlainObject({
		...cart,
		items: cart.items as CartItem[],
		itemsPrice: cart.itemsPrice.toString(),
		shippingPrice: cart.shippingPrice.toString(),
		taxPrice: cart.taxPrice.toString(),
		totalPrice: cart.totalPrice.toString(),
	});
}

// REMOVE ITEM FROM CART
export async function removeItemFromCart(productId: string) {
	const context: {
		updatedCartItem: CartItem | null;
		removedCartItem: CartItem | null;
	} = {
		updatedCartItem: null,
		removedCartItem: null,
	};

	try {
		console.log(productId);
		// Check if session cart id string exists in cookie value on client side
		const sessionCartId = (await cookies()).get(SESSION_CART_ID)?.value;
		if (!sessionCartId) {
			throw new Error('Session cart id cookie not found');
		}

		// Get user cart from db
		const cart = await getCart();
		if (!cart) throw new Error('Cart not found');

		// Get product from db
		const product = await prisma.product.findFirst({
			where: { id: productId },
		});
		if (!product) throw new Error('Product not found');

		// Check if item with productId exists in cart
		const existItemInCart = cart.items.find(
			(item) => item.productId === productId
		);
		if (!existItemInCart) throw new Error('Item not found in the Cart');

		// Check if item quantity is equal 1 or more than 1
		if (existItemInCart.qty === 1) {
			// Remove item from cart
			cart.items = cart.items.filter(
				(item) => item.productId !== existItemInCart.productId
			);

			context.removedCartItem = { ...existItemInCart, qty: 0 };
		} else {
			// Decrease item quantity in cart
			const decreasedQty = (cart.items.find(
				(item) => item.productId === productId
			)!.qty = existItemInCart.qty - 1);

			context.updatedCartItem = { ...existItemInCart, qty: decreasedQty };
		}

		// Update cart in db
		await prisma.cart.update({
			where: { id: cart.id },
			data: {
				items: cart.items,
				...calcPrices(cart.items),
			},
		});

		revalidatePath(`${ROUTES.PRODUCT}/${product.slug}`);

		return {
			success: true,
			data: context.updatedCartItem
				? {
						productId: context.updatedCartItem.productId,
						name: context.updatedCartItem.name,
						slug: context.updatedCartItem.slug,
						qty: context.updatedCartItem.qty,
						image: context.updatedCartItem.image,
						price: context.updatedCartItem.price,
				  } // if updatedExistItemInCart.qty >= 1 frontend know, that in the cart are 1 or more item quantities
				: {
						productId: context.removedCartItem!.productId,
						name: context.removedCartItem!.name,
						slug: context.removedCartItem!.slug,
						qty: context.removedCartItem!.qty,
						image: context.removedCartItem!.image,
						price: context.removedCartItem!.price,
				  }, // if removedCarItem.qty = 0 frontend know, that there is no item in the cart
			message: 'Product was removed from the Cart',
		};
	} catch (error) {
		console.log(error);
		return {
			success: false,
			data: {
				productId,
				name: '',
				slug: '',
				qty: 0,
				image: '',
				price: '',
			},
			message: formatErrorMessages(error),
		};
	}
}

// product: {
// 	id: '52da1815-7306-4792-ac48-cc67afe606b8',
// 	name: 'Polo Classic Pink Hoodie',
// 	slug: 'polo-classic-pink-hoodie',
// 	category: "Men's Sweatshirts",
// 	images: [
// 		'/assets/images/sample-products/p6-1.jpg',
// 		'/assets/images/sample-products/p6-2.jpg'
// 	],
// 	brand: 'Polo',
// 	description: 'Soft, stylish, and perfect for laid-back days',
// 	stock: 8,
// 	price: '99.99',
// 	rating: '4.6',
// 	numReviews: '12',
// 	isFeatured: true,
// 	banner: null,
// 	createdAt: 2025-04-24T10:50:17.522Z
// }

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
