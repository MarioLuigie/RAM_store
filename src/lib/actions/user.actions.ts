'use server';
// modules
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { hashSync } from 'bcrypt-ts-edge';
// lib
import {
	ShippingAddressSchema,
	SignInFormSchema,
	SignUpFormSchema,
} from '@/lib/utils/validators';
import { auth, signIn, signOut } from '@/config/auth';
import { prisma } from '@/lib/db/prisma';
import { formatErrorMessages } from '@/lib/utils/server';
import { ShippingAddress } from '@/lib/types/shipping.types';

// SIGN IN THE USER WITH CREDENTIALS
export async function signInUserWithCredentials(
	prevState: unknown,
	formData: FormData
) {
	try {
		const user = SignInFormSchema.parse({
			email: formData.get('email'),
			password: formData.get('password'),
		});

		await signIn('credentials', user);

		return {
			success: true,
			message: 'Signed in successfully',
		};
	} catch (error: unknown) {
		if (isRedirectError(error)) {
			throw error;
		} else {
			console.error('Unknown error:', error);
		}

		return {
			success: false,
			message: 'Invalid e-mail or password',
		};
	}
}

// SIGN USER UP
export async function signUpUserWithCredentials(
	prevState: unknown,
	formData: FormData
) {
	try {
		const user = SignUpFormSchema.parse({
			name: formData.get('name'),
			email: formData.get('email'),
			password: formData.get('password'),
			confirmPassword: formData.get('confirmPassword'),
		});

		const plainPassword = user.password;
		user.password = hashSync(user.password, 10);

		await prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: user.password,
			},
		});

		await signIn('credentials', {
			email: user.email,
			password: plainPassword,
		});

		return {
			success: true,
			message: 'User registered successfully',
		};
	} catch (error: unknown) {
		if (isRedirectError(error)) {
			throw error;
		} else {
			console.error('Unknown error:', error);
		}

		return {
			success: false,
			message: formatErrorMessages(error),
		};
	}
}

// SIGN USER OUT
export async function signOutUser() {
	await signOut();
}

// GET USER BY THE ID
export async function getUserById(userId: string) {
	console.log(userId);
	try {
		const user = await prisma.user.findFirst({
			where: { id: userId },
		});

		if (!user) throw new Error('User not found');

		return {
			success: true,
			data: user,
			message: 'User founded with successful',
		};
	} catch (error) {
		console.log(error);
		return {
			success: false,
			data: { id: '', address: {} },
		};
	}
}

// UPDATE THE USER`S ADDRESS IN DB
export async function updateUserAddress(data: ShippingAddress) {
	try {
		const session = await auth();

		const currentUser = await prisma.user.findFirst({
			where: { id: session?.user?.id },
		});

		if (!currentUser) throw new Error('User not found');

		const address = ShippingAddressSchema.parse(data);

		const updatedUser = await prisma.user.update({
			where: { id: currentUser.id },
			data: { address },
		});

		return {
			success: true,
			data: {
				name: updatedUser.name,
			},
			message: 'User`s address updated with successfull',
		};
	} catch (error) {
		return {
			success: false,
			data: {
				name: '',
			},
			message: formatErrorMessages(error),
		};
	}
}
