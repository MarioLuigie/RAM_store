import { NextResponse, NextRequest } from 'next/server'
import { SESSION_CART_ID } from '@/lib/constants'

export function middleware(request: NextRequest) {
	const newRequestHeaders = new Headers(request.headers)

	const hasSessionCartId = request.cookies.has(SESSION_CART_ID)

	if (!hasSessionCartId) {
		const sessionCartId = crypto.randomUUID()
		// console.log('Nowy sessionCartId:', sessionCartId)

		newRequestHeaders.set(SESSION_CART_ID, sessionCartId)

		const response = NextResponse.next({
			request: {
				headers: newRequestHeaders,
			},
		})

		response.cookies.set({
			name: SESSION_CART_ID,
			value: sessionCartId,
			path: '/',
			maxAge: 60 * 60 * 24 * 30,
			httpOnly: true,
			sameSite: 'lax',
		})

		return response
	}

	// Nawet jeśli cookie istnieje, dodaj je do headers
	const existingCartId = request.cookies.get(SESSION_CART_ID)!.value
	newRequestHeaders.set(SESSION_CART_ID, existingCartId)

	return NextResponse.next({
		request: {
			headers: newRequestHeaders,
		},
	})
}

export const config = {
	matcher: ['/((?!api|_next|.*\\..*).*)'],
}

// // src/middleware.ts
// // modules
// import { NextResponse, NextRequest } from 'next/server'
// import { SESSION_CART_ID } from '@/lib/constants'

// export function middleware(request: NextRequest) {

//   const newRequestHeaders = new Headers(request.headers)

//   const response = NextResponse.next({
//     request: {
//       headers: newRequestHeaders,
//     }
//   })

//   // SESSION CART ID
//   // Check sessionCartId exists
//   const hasSessionCartId = request.cookies.has(SESSION_CART_ID)

//   if (!hasSessionCartId) {
//     const sessionCartId = crypto.randomUUID() // Web API, run at Edge runtime
//     console.log('🛒 Nowy sessionCartId:', sessionCartId)

//     // Set sessionCartId cookie if does not exist to the set-cookies(set-cookie is the single header item from headers obj)
//     response.cookies.set({
//       name: SESSION_CART_ID,
//       value: sessionCartId,
//       path: '/',
//       maxAge: 60 * 60 * 24 * 30, // 30 days
//       httpOnly: true,
//       sameSite: 'lax',
//     })

//     // Add content from sessionCartId cookie to the headers as ram-session-cart-id
//     // ram-session-cart-id: sessionCartId (value)
//     // in order to read sessionCartId in server components that do not have access to cookies
//     newRequestHeaders.set(SESSION_CART_ID, sessionCartId)

//   } else {
//     console.log('🛒 sessionCartId already exists:')
//   }

//   return response
// }

// export const config = {
//   matcher: ['/((?!api|_next|.*\\..*).*)'], // pomiń /api, pliki statyczne itd.
// }

// response.headers = {
//   "content-type": "text/html; charset=utf-8",
//   "set-cookie": "sessionCartId=abc-123; Path=/; HttpOnly; SameSite=Lax",
//   "x-custom-header": "example"
// };
