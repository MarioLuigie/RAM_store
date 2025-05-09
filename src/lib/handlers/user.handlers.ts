import { ShippingAddress } from '@/lib/types/shipping.types';
import { PaymentMethod } from '@/lib/types/payment.types';
import { updateUserAddress, updateUserPaymentMethod } from '@/lib/actions/user.actions';
import { toast } from 'sonner';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// USER UPDATE ADDRESS HANDLER
export async function handleUpdateUserAddress(
	address: ShippingAddress,
	router: AppRouterInstance,
  redirectPath: string,
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
  redirectPath: string,
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
