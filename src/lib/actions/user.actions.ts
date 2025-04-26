'use server'
// modules
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { hashSync } from 'bcrypt-ts-edge'
// lib
import { SignInFormSchema, SignUpFormSchema } from '@/lib/utils/validators'
import { signIn, signOut } from '@/config/auth'
import { prisma } from '@/lib/db/prisma'

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
export async function signUpUser(
	prevState: unknown,
	formData: FormData
) {
	try {
		const user = SignUpFormSchema.parse({
			name: formData.get('name'),
			email: formData.get('email'),
			password: formData.get('password'),
			confirmPassword: formData.get('confirmPassword'),
		})

		const plainPassword = user.password
		user.password = hashSync(user.password, 10)

		await prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: user.password,
			},
		})

		await signIn('credentials', {
			email: user.email,
			password: plainPassword,
		})

		return {
			success: true,
			message: 'User registered successfully',
		}
	} catch (error: unknown) {
		if (isRedirectError(error)) {
			throw error
		} else {
			console.error('Unknown error:', error)
		}

		return {
			success: false,
			message: 'User was not registered'
		}
	}
}

// SIGN USER OUT
export async function signOutUser() {
	await signOut()
}
