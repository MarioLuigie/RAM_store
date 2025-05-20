import { ShippingAddress } from '@/lib/types/shipping.types';
import { PaymentMethod } from '@/lib/types/payment.types';
import {
	updateUserAddress,
	updateUserPaymentMethod,
} from '@/lib/actions/user.actions';
import { toast } from 'sonner';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { UpdateProfile } from '@/lib/types/user.types';
import { updateProfile } from '@/lib/actions/user.actions';
import { Session } from 'next-auth';

// USER UPDATE ADDRESS HANDLER
export async function handleUpdateUserAddress(
	address: ShippingAddress,
	router: AppRouterInstance,
	redirectPath: string
) {
	const result = await updateUserAddress(address);
	const { success, message } = result;

	if (success) {
		toast.success(message);
		router.push(redirectPath);
	} else {
		toast.error(message);
	}
}

// USER UPDATE PAYMENT METHOD HANDLER
export async function handleUpdateUserPaymentMethod(
	preferredPaymentMethod: PaymentMethod,
	router: AppRouterInstance,
	redirectPath: string
) {
	const result = await updateUserPaymentMethod(preferredPaymentMethod);
	const { success, message } = result;

	if (success) {
		toast.success(message);
		router.push(redirectPath);
	} else {
		toast.error(message);
	}
}

// UPDATE THE USER PROFILE HANDLER
export async function handleUpdateProfile(
	updateProfileValues: UpdateProfile,
	session: Session | null,
	update: (data?: Partial<Session>) => Promise<Session | null>
) {
	if (!session || !session.user) {
		toast.error('You must be logged in to update your profile.');
		return;
	}

	const {
		success,
		data: updatedUser,
		message,
	} = await updateProfile(updateProfileValues);

	if (success) {
		const sessionToUpdate = {
			...session,
			user: {
				...session?.user,
				name: updatedUser?.name ?? session.user.name,
			},
		};

		await update(sessionToUpdate);

		toast.success(message);
	} else {
		toast.error(message);
	}
}
