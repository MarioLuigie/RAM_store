//modules
import { redirect } from 'next/navigation'
// lib
import { auth } from '@/config/auth'
import { ROUTES } from '@/lib/constants/paths'
import { AuthTypes } from '@/lib/constants/enums'
// components
import AuthForm from '@/components/forms/AuthForm'
import AuthPad from '@/components/content/AuthPad'

export default async function AuthPage({
	callbackUrl,
	type,
}: {
	callbackUrl: string
	type: AuthTypes
}) {
	const session = await auth()

	// callbackUrl - only for redirecting from providers site to app
	if (session) {
		redirect(callbackUrl || ROUTES.HOME)
	}

	// SIGN IN
	if (type === AuthTypes.SIGN_IN) {
		return (
			<AuthPad title="Sign In" desc="Sign in to your account">
				<AuthForm type={AuthTypes.SIGN_IN}/>
			</AuthPad>
		)
	}

	//SIGN UP
	if (type === AuthTypes.SIGN_UP) {
		return (
			<AuthPad title='Sign Up' desc='Create your account and sign in'>
				<AuthForm type={AuthTypes.SIGN_UP}/>
			</AuthPad>
		)
	}
}
