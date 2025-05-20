'use server';
// modules
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { hashSync } from 'bcrypt-ts-edge';
// lib
import {
	PaymentMethodSchema,
	ShippingAddressSchema,
	SignInFormSchema,
	SignUpFormSchema,
} from '@/lib/utils/validators';
import { auth, signIn, signOut } from '@/config/auth';
import { prisma } from '@/lib/db/prisma';
import { formatErrorMessages } from '@/lib/utils/server';
import { ShippingAddress } from '@/lib/types/shipping.types';
import { PaymentMethod } from '@/lib/types/payment.types';

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

		const callbackUrl = formData.get('callbackUrl')?.toString() || '/';

		await signIn('credentials', {
			...user,
			callbackUrl,
		});

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

		const callbackUrl = formData.get('callbackUrl')?.toString() || '/';

		await signIn('credentials', {
			email: user.email,
			password: plainPassword,
			callbackUrl,
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
			message: 'User founded successfully',
		};
	} catch (error) {
		return {
			success: false,
			data: {
				id: '',
				name: '',
				email: '',
				emailVerified: '',
				password: '',
				role: '',
				address: {},
				paymentMethod: '',
				image: '',
				createdAt: '',
				updatedAt: '',
			},
			message: formatErrorMessages(error),
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

		await prisma.user.update({
			where: { id: currentUser.id },
			data: { address },
		});

		return {
			success: true,
			message: 'Address updated successfully!',
		};
	} catch (error) {
		return {
			success: false,
			message: formatErrorMessages(error),
		};
	}
}

// UPDATE USER`S PAYMENT METHOD
export async function updateUserPaymentMethod(data: PaymentMethod) {
	try {
		console.log(data);

		const session = await auth();

		const currentUser = await prisma.user.findFirst({
			where: { id: session?.user?.id },
		});

		if (!currentUser) throw new Error('User not found');

		// Data`s validation on server side
		const paymentMethod = PaymentMethodSchema.parse(data);

		await prisma.user.update({
			where: { id: currentUser.id },
			data: { paymentMethod: paymentMethod.type },
		});

		return {
			success: true,
			message: 'User updated successfully',
		};
	} catch (error) {
		console.log(error);
		return {
			success: false,
			message: formatErrorMessages(error),
		};
	}
}

// UPDATE THE USER PROFILE
export async function updateProfile(user: { name: string; email: string }) {
	try {
		const session = await auth();

		if (!session?.user?.id) {
			throw new Error('Unauthorized');
		}

		const currentUser = await prisma.user.findFirst({
			where: { id: session?.user?.id },
		});

		if (!currentUser) throw new Error('User not found');

		const updatedUser = await prisma.user.update({
			where: { id: currentUser.id },
			data: {
				name: user.name,
				email: user.email,
			},
		});

		return {
			success: true,
			data: {
				id: updatedUser.id,
				name: updatedUser.name,
				email: updatedUser.email,
			},
			message: 'User profile updated successfully',
		};
	} catch (error) {
		return {
			success: false,
			message: formatErrorMessages(error),
		};
	}
}
