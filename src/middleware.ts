import { NextResponse, NextRequest } from 'next/server';
import { SESSION_CART_ID } from '@/lib/constants';
import { getToken } from 'next-auth/jwt';
import { ROUTES } from '@/lib/constants/paths';

const protectedPaths = [
	/^\/shipping-address/,
	/^\/payment-method/,
	/^\/place-order/,
	/^\/profile/,
	/^\/user\/.*/,
	/^\/order\/.*/,
	/^\/admin/,
];

export async function middleware(request: NextRequest) {
	const url = request.nextUrl;
	const pathname = url.pathname;

	// 🔒 Sprawdzenie, czy ścieżka jest chroniona
	// CHECK IF PATH/ROUTE IS AUTHENTICATED
	const requiresAuth = protectedPaths.some((pattern) =>
		pattern.test(pathname)
	);

	if (requiresAuth) {
		// const token = await getToken({
		// 	req: request,
		// 	secret: process.env.NEXTAUTH_SECRET,
		// });

		const token = await getToken({
			req: request,
			secret: process.env.NEXTAUTH_SECRET,
			// cookieName:
			// 	process.env.NODE_ENV === 'production'
			// 		? '__Secure-authjs.session-token'
			// 		: 'next-auth.session-token',
			secureCookie: process.env.NODE_ENV === 'production',
		});
		const isAuthenticated = !!token;

		if (!isAuthenticated) {
			const signInUrl = new URL(ROUTES.SIGN_IN, request.url);
			signInUrl.searchParams.set('callbackUrl', pathname); // umożliwia redirect po zalogowaniu
			return NextResponse.redirect(signInUrl);
		}
	}

	// 🍪 Zarządzanie sesją koszyka (Twoja logika)
	// SESSION CART`S MANAGMENT
	const newRequestHeaders = new Headers(request.headers);

	const hasSessionCartId = request.cookies.has(SESSION_CART_ID);

	if (!hasSessionCartId) {
		const sessionCartId = crypto.randomUUID();
		// console.log('Nowy sessionCartId:', sessionCartId)

		newRequestHeaders.set(SESSION_CART_ID, sessionCartId);

		const response = NextResponse.next({
			request: {
				headers: newRequestHeaders,
			},
		});

		response.cookies.set({
			name: SESSION_CART_ID,
			value: sessionCartId,
			path: '/',
			maxAge: 60 * 60 * 24 * 30,
			httpOnly: true,
			sameSite: 'lax',
		});

		return response;
	}

	// Nawet jeśli cookie istnieje, dodaj je do headers
	const existingCartId = request.cookies.get(SESSION_CART_ID)!.value;
	newRequestHeaders.set(SESSION_CART_ID, existingCartId);

	return NextResponse.next({
		request: {
			headers: newRequestHeaders,
		},
	});
}

export const config = {
	matcher: ['/((?!api|_next|.*\\..*).*)'],
};

// import { NextResponse, NextRequest } from 'next/server';
// import { SESSION_CART_ID } from '@/lib/constants';
// import { getToken } from 'next-auth/jwt';
// import { ROUTES } from '@/lib/constants/paths';

// const protectedPaths = [
// 	/^\/shipping-address/,
// 	/^\/payment-method/,
// 	/^\/place-order/,
// 	/^\/profile/,
// 	/^\/user\/.*/,
// 	/^\/order\/.*/,
// 	/^\/admin/,
// ];

// export async function middleware(request: NextRequest) {
// 	const url = request.nextUrl;
// 	const pathname = url.pathname;

// 	// 🔒 Sprawdzenie, czy ścieżka jest chroniona
// 	// CHECK IF PATH/ROUTE IS AUTHENTICATED
// 	const requiresAuth = protectedPaths.some((pattern) =>
// 		pattern.test(pathname)
// 	);

// 	console.log('REQUIRES AUTH:', requiresAuth);

// 	if (requiresAuth) {
// 		const token = await getToken({
// 			req: request,
// 			secret: process.env.NEXTAUTH_SECRET,
// 		});
// 		const isAuthenticated = !!token;

// 		console.log('middleware hit:', pathname);
// 		console.log('token:', token);
// 		console.log('isAuthenticated:', isAuthenticated);

// 		if (!isAuthenticated) {
// 			const signInUrl = new URL(ROUTES.SIGN_IN, request.url);
// 			signInUrl.searchParams.set('callbackUrl', pathname); // umożliwia redirect po zalogowaniu
// 			return NextResponse.redirect(signInUrl);
// 		}
// 	}

// 	// 🍪 Zarządzanie sesją koszyka (Twoja logika)
// 	// SESSION CART`S MANAGMENT
// 	const newRequestHeaders = new Headers(request.headers);

// 	const hasSessionCartId = request.cookies.has(SESSION_CART_ID);

// 	if (!hasSessionCartId) {
// 		const sessionCartId = crypto.randomUUID();
// 		// console.log('Nowy sessionCartId:', sessionCartId)

// 		newRequestHeaders.set(SESSION_CART_ID, sessionCartId);

// 		const response = NextResponse.next({
// 			request: {
// 				headers: newRequestHeaders,
// 			},
// 		});

// 		response.cookies.set({
// 			name: SESSION_CART_ID,
// 			value: sessionCartId,
// 			path: '/',
// 			maxAge: 60 * 60 * 24 * 30,
// 			httpOnly: true,
// 			sameSite: 'lax',
// 		});

// 		return response;
// 	}

// 	// Nawet jeśli cookie istnieje, dodaj je do headers
// 	const existingCartId = request.cookies.get(SESSION_CART_ID)!.value;
// 	newRequestHeaders.set(SESSION_CART_ID, existingCartId);

// 	return NextResponse.next({
// 		request: {
// 			headers: newRequestHeaders,
// 		},
// 	});
// }

// export const config = {
// 	matcher: [
// 	],
// };

// request.nextUrl - {
//   href: 'http://localhost:3000/sign-in?callbackUrl=%2Fshipping-address',
//   origin: 'http://localhost:3000',
//   protocol: 'http:',
//   username: '',
//   password: '',
//   host: 'localhost:3000',
//   hostname: 'localhost',
//   port: '3000',
//   pathname: '/sign-in',
//   search: '?callbackUrl=%2Fshipping-address',
//   searchParams: URLSearchParams {  },
//   hash: ''
// }
// request.nextUrl.pathname - /sign-in

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
