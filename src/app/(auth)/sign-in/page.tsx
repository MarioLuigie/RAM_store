// modules
import { Metadata } from 'next'
// components
import SignInPage from '@/components/pages/SignInPage'

export const metadata: Metadata = {
	title: 'Sign in',
}

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ callbackUrl: string }>
}) {
	const { callbackUrl } = await searchParams

	return <SignInPage callbackUrl={callbackUrl} />
}
