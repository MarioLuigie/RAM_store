import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
// Ustawienie WebSocketów – wymagane przez Neon do pracy przez serwerless (np. Vercel)
neonConfig.webSocketConstructor = ws;

// Pobieramy connection string do bazy PostgreSQL z Neona
const connectionString = `${process.env.DATABASE_URL}`;

// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
// Tworzymy adapter Prisma dla Neon – zamiast tworzyć Pool, podajemy po prostu connectionString
const adapter = new PrismaNeon({ connectionString });

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
// Tworzymy instancję PrismaClient z adapterem
export const prisma = new PrismaClient({ adapter }).$extends({
	//Zmiana typów danych surowych/nadpisanie nowymi typami w locie w czasie pobierania z db
	result: {
		product: {
			price: {
				// Zmieniamy Decimal → string, aby uniknąć problemów z JSON-em
				compute(product) {
					return product.price.toString();
				},
			},
			rating: {
				compute(product) {
					return product.rating.toString();
				},
			},
			numReviews: {
				compute(product) {
					return product.numReviews.toString();
				},
			},
		},
		cart: {
			itemsPrice: {
				needs: { itemsPrice: true },
				compute(cart) {
					return cart.itemsPrice.toString();
				},
			},
			shippingPrice: {
				needs: { shippingPrice: true },
				compute(cart) {
					return cart.shippingPrice.toString();
				},
			},
			taxPrice: {
				needs: { taxPrice: true },
				compute(cart) {
					return cart.taxPrice.toString();
				},
			},
			totalPrice: {
				needs: { totalPrice: true },
				compute(cart) {
					return cart.totalPrice.toString();
				},
			},
		},
		order: {
			itemsPrice: {
				needs: { itemsPrice: true },
				compute(cart) {
					return cart.itemsPrice.toString();
				},
			},
			shippingPrice: {
				needs: { shippingPrice: true },
				compute(cart) {
					return cart.shippingPrice.toString();
				},
			},
			taxPrice: {
				needs: { taxPrice: true },
				compute(cart) {
					return cart.taxPrice.toString();
				},
			},
			totalPrice: {
				needs: { totalPrice: true },
				compute(cart) {
					return cart.totalPrice.toString();
				},
			},
		},
		orderItem: {
			price: {
				compute(cart) {
					return cart.price.toString();
				}
			}
		}
	},
});

// import { Pool, neonConfig } from '@neondatabase/serverless';
// import { PrismaNeon } from '@prisma/adapter-neon';
// import { PrismaClient } from '@prisma/client';
// import ws from 'ws';

// // Sets up WebSocket connections, which enables Neon to use WebSocket communication.
// neonConfig.webSocketConstructor = ws;
// const connectionString = `${process.env.DATABASE_URL}`;

// // Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.
// const pool = new Pool({ connectionString });

// // Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
// const adapter = new PrismaNeon(pool);

// // Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
// export const prisma = new PrismaClient({ adapter }).$extends({
//   result: {
//     product: {
//       price: {
//         compute(product) {
//           return product.price.toString();
//         },
//       },
//       rating: {
//         compute(product) {
//           return product.rating.toString();
//         },
//       },
//     },
//   },
// });
