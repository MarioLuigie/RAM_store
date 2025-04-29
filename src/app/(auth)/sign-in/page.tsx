// modules
import { Metadata } from 'next'
// lib
import { AuthTypes } from '@/lib/constants/enums'
// components
import AuthPage from '@/components/pages/AuthPage'

// Only for tests - read my ram-session-cart-id cookie (from requst headers added in middleware) in SSR server component
// read cookie from cookies() non possible in server components
import { headers } from 'next/headers'
import { SESSION_CART_ID } from '@/lib/constants'

export const metadata: Metadata = {
	title: 'Sign in',
}

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ callbackUrl: string }>
}) {
	const { callbackUrl } = await searchParams

	const sessionCartId = (await headers()).get(SESSION_CART_ID)
	console.log("COOKIE PAYLOAD FROM MIDDLEWARE", sessionCartId)

	return <AuthPage callbackUrl={callbackUrl} type={AuthTypes.SIGN_IN} />
}
