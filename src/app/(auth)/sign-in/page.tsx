// modules
import { Metadata } from 'next';
// lib
import { AuthTypes } from '@/lib/constants/enums';
// components
import AuthPage from '@/components/pages/AuthPage';

// Only for tests - read my ram-session-cart-id cookie (from requst headers added in middleware) in SSR server component
// read cookie from cookies() non possible in server components
import { SESSION_CART_ID } from '@/lib/constants';
import { headers } from 'next/headers';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
	title: 'Sign in',
};

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ callbackUrl: string }>;
}) {
	const { callbackUrl } = await searchParams;

	// TEST - read cookie value from request headers (nesecery in API routes ex.)
	const sessionCartId = (await headers()).get(SESSION_CART_ID);
	console.log('COOKIE PAYLOAD FROM MIDDLEWARE', sessionCartId);

	// TEST - read cookie value from cookies()
	const cookie = (await cookies()).get(SESSION_CART_ID);
	console.log('COOKIE PAYLOAD FROM cookies()', cookie?.value);

	return <AuthPage callbackUrl={callbackUrl} type={AuthTypes.SIGN_IN} />;
}
