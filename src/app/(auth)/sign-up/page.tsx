// modules
import { Metadata } from 'next'
// lib
import { AuthTypes } from '@/lib/constants/enums'
// component
import AuthPage from '@/components/pages/AuthPage'

export const metadata: Metadata = {
	title: 'Sign up',
}

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ callbackUrl: string }>
}) {
	const { callbackUrl } = await searchParams

	return <AuthPage callbackUrl={callbackUrl} type={AuthTypes.SIGN_UP} />
}
