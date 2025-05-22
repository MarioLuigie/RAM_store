// // modules
// import NextAuth from 'next-auth';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import { prisma } from '@/lib/db/prisma';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { compareSync } from 'bcrypt-ts-edge';
// import type { NextAuthConfig } from 'next-auth';

// export const config = {
// 	pages: {
// 		signIn: '/sign-in',
// 		error: '/sign-in',
// 	},
// 	session: {
// 		strategy: 'jwt',
// 		maxAge: 30 * 24 * 60 * 60, // expire after 30 days
// 	},
// 	adapter: PrismaAdapter(prisma),
// 	providers: [
// 		CredentialsProvider({
// 			credentials: {
// 				email: { type: 'email', placeholder: 'text@example.com' },
// 				password: { type: 'password' },
// 			},
// 			async authorize(credentials) {
// 				if (credentials === null) return null;
// 				//Find user in database
// 				const user = await prisma.user.findFirst({
// 					where: {
// 						email: credentials.email as string,
// 					},
// 				});

// 				// Check if the user exists and the password matches
// 				if (user && user.password) {
// 					const isMatch = compareSync(
// 						credentials.password as string,
// 						user.password
// 					);

// 					// If password is correct return user
// 					if (isMatch) {
// 						return {
// 							id: user.id,
// 							name: user.name,
// 							email: user.email,
// 							role: user.role,
// 						};
// 					}
// 				}
// 				// If user does not exist or password does not match return null
// 				return null;
// 			},
// 		}),
// 	],
// 	callbacks: {
// 		async session({ session, user, trigger, token }) {
// 			// Set the user ID from the token
// 			session.user.id = token.sub as string;
// 			session.user.role = token.role;
// 			session.user.name = token.name;

// 			// console.log("TOKEN:", token)

// 			// If there is an update, set the user name
// 			if (trigger === 'update') {
// 				session.user.name = user.name;
// 			}

// 			return session;
// 		},
// 		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 		async jwt({ user, token }: any) {
// 			// Asign user fields to token
// 			if (user) {
// 				token.role = user.role;
// 				// When user does not have a name use the email (default name in db model is NO_NAME)
// 				if (user.name === 'NO_NAME') {
// 					token.name = user.email!.split('@')[0];
// 					// Update database to reflect the token name
// 					await prisma.user.update({
// 						where: { id: user.id },
// 						data: { name: token.name },
// 					});
// 				}
// 			}

// 			return token;
// 		},
// 	},
// } satisfies NextAuthConfig;

// export const { handlers, signIn, signOut, auth } = NextAuth(config);

// modules
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';
import { cookies } from 'next/headers';
import { SESSION_CART_ID } from '@/lib/constants';
import { USER_WHITE_LIST } from '@/lib/constants';
import { AuthRole } from '@/lib/constants/enums';

export const config = {
	pages: {
		signIn: '/sign-in',
		error: '/sign-in',
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // expire after 30 days
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			credentials: {
				email: { type: 'email', placeholder: 'text@example.com' },
				password: { type: 'password' },
			},
			async authorize(credentials) {
				if (credentials === null) return null;
				//Find user in database
				const user = await prisma.user.findFirst({
					where: {
						email: credentials.email as string,
					},
				});

				// Check if the user exists and the password matches
				if (user && user.password) {
					const isMatch = compareSync(
						credentials.password as string,
						user.password
					);

					// If password is correct return user
					if (isMatch) {
						return {
							id: user.id,
							name: user.name,
							email: user.email,
							role: user.role,
						};
					}
				}
				// If user does not exist or password does not match return null
				return null;
			},
		}),
	],
	callbacks: {
		async session({ session, user, trigger, token }) {
			// Set the user ID from the token
			session.user.id = token.sub as string;
			session.user.role = token.role;
			session.user.name = token.name;

			// console.log("TOKEN:", token)

			// If there is an update, set the user name
			if (trigger === 'update') {
				session.user.name = user.name;
			}

			return session;
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async jwt({ user, token, trigger, session }: any) {
			// Asign user fields to token
			if (user) {
				token.id = user.id;

				const isWhiteList = USER_WHITE_LIST.includes(user.email);

				if (isWhiteList) {
					const dbUser = await prisma.user.findUnique({
						where: { id: user.id },
						select: { role: true },
					});

					if (dbUser?.role !== AuthRole.ADMIN) {
						await prisma.user.update({
							where: { id: user.id },
							data: { role: AuthRole.ADMIN },
						});

						await prisma.roleChangeLog.create({
							data: {
								userId: user.id,
								email: user.email!,
								newRole: AuthRole.ADMIN,
							},
						});
					}

					token.role = AuthRole.ADMIN;
				} else {
					token.role = user.role;
				}

				// When user does not have a name use the email (default name in db model is NO_NAME)
				if (user.name === 'NO_NAME') {
					token.name = user.email!.split('@')[0];
					// Update database to reflect the token name
					await prisma.user.update({
						where: { id: user.id },
						data: { name: token.name },
					});
				}

				if (trigger === 'signIn' || trigger === 'signUp') {
					const sessionCartId = (await cookies()).get(
						SESSION_CART_ID
					)?.value;

					if (sessionCartId) {
						const sessionCart = await prisma.cart.findFirst({
							where: { sessionCartId },
						});

						if (sessionCart) {
							// Jeśli koszyk jest już przypisany do użytkownika, nic nie rób
							if (sessionCart.userId !== user.id) {
								// Usuń tylko inne koszyki przypisane do tego użytkownika
								await prisma.cart.deleteMany({
									where: {
										userId: user.id,
										id: { not: sessionCart.id },
									},
								});

								// Przypisz koszyk z ciasteczka do użytkownika
								await prisma.cart.update({
									where: { id: sessionCart.id },
									data: { userId: user.id },
								});
							}
						}

						// if (sessionCart) {
						// 	// Delete current user`s cart (that is old unused cart)
						// 	await prisma.cart.deleteMany({
						// 		where: { userId: user.id },
						// 	});

						// 	// Assign new cart to user
						// 	await prisma.cart.update({
						// 		where: { id: sessionCart.id },
						// 		data: { userId: user.id },
						// 	});
						// }
					}
				}
			}
			// Handle session updates
			if (session?.user.name && trigger === 'update') {
				token.name = session.user.name;
			}

			return token;
		},
	},
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);

// TOKEN: {
//   name: 'Jan',
//   email: 'admin@example.com',
//   sub: '28610bf5-2e8f-4ebd-a141-81bc1bbc8877',
//   iat: 1745770479,
//   exp: 1748362479,
//   jti: '36c31292-0d53-457f-9424-5a59f58ed2f4'
// }

// providers: [
//   CredentialsProvider({
//     // The name to display on the sign in form (e.g. "Sign in with...")
//     name: "Credentials",
//     // `credentials` is used to generate a form on the sign in page.
//     // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//     // e.g. domain, username, password, 2FA token, etc.
//     // You can pass any HTML attribute to the <input> tag through the object.
//     credentials: {
//       username: { label: "Username", type: "text", placeholder: "jsmith" },
//       password: { label: "Password", type: "password" }
//     },
//     async authorize(credentials, req) {
//       // Add logic here to look up the user from the credentials supplied
//       const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

//       if (user) {
//         // Any object returned will be saved in `user` property of the JWT
//         return user
//       } else {
//         // If you return null then an error will be displayed advising the user to check their details.
//         return null

//         // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//       }
//     }
//   })
// ],
