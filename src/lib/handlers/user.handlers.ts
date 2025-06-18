import { ShippingAddress } from '@/lib/types/shipping.types';
import { PaymentMethod } from '@/lib/types/payment.types';
import {
	updateUserAddress,
	updateUserPaymentMethod,
} from '@/lib/actions/user.actions';
import { toast } from 'sonner';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { UpdateProfile, UpdateUser } from '@/lib/types/user.types';
import { updateProfile, updateUser } from '@/lib/actions/user.actions';
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

// ADMIN UPDATE USER HANDLER
export async function handleUpdateUser(
	user: UpdateUser,
) {
	const result = await updateUser(user);
	const { success, message } = result;

	console.log("Updated User from client")

	if (success) {
		toast.success(message);
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
	update: (data?: Session) => Promise<Session | null>,
	router: AppRouterInstance
) {
	if (!session || !session.user) {
		toast.error('You must be logged in to update your profile.');
		return;
	}

	const { success, data, message } = await updateProfile(updateProfileValues);

	if (success) {
		const sessionToUpdate = {
			...session,
			user: {
				...session?.user,
				name: data?.name,
			},
		};

		await update(sessionToUpdate);
		router.refresh();
		// window.location.reload();

		toast.success(message);
	} else {
		toast.error(message);
	}
}
