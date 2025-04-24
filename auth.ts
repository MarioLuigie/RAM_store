// modules
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge'
import type { NextAuthConfig } from 'next-auth'

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
				if (credentials === null) return null
				//Find user in database
				const user = await prisma.user.findFirst({
					where: {
						email: credentials.email as string,
					},
				})

				// Check if the user exists and the password matches
				if (user && user.password) {
					const isMatch = compareSync(
						credentials.password as string,
						user.password
					)

					// If password is correct return user
					if (isMatch) {
						return {
							id: user.id,
							name: user.name,
							email: user.email,
							role: user.role,
						}
					}
				}
				// If user does not exist or password does not match return null
				return null
			},
		}),
	],
	callbacks: {
		async session({ session, user, trigger, token }) {
			// Set the user ID from the token
			session.user.id = token.sub as string

			// If there is an update, set the user name
			if(trigger === 'update') {
				session.user.name = user.name
			}

			return session
		},
	}
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(config)

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
