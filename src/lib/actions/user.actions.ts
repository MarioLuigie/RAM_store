'use server'
// modules
import { isRedirectError } from 'next/dist/client/components/redirect-error'
// lib
import { SignInFormSchema } from '@/lib/utils/validators'
import { signIn, signOut } from '@/config/auth'

// SIGN IN THE USER WITH CREDENTIALS
export async function SignInUserWithCredentials(
	prevState: unknown,
	formData: FormData
) {
	try {
		const user = SignInFormSchema.parse({
			email: formData.get('email'),
			password: formData.get('password'),
		})

		await signIn('credentials', user)

		return {
			success: true,
			message: 'Signed in successfully',
		}
	} catch (error: unknown) {
		if (isRedirectError(error)) {
			throw error
		} else {
			console.error('Unknown error:', error)
		}

		return {
			success: false,
			message: 'Invalid e-mail or password',
		}
	}
}

// SIGN USER UP
export async function signUpUser() {

}

// SIGN USER OUT
export async function signOutUser() {
	await signOut()
}
