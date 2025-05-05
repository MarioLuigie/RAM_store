import { ShippingAddress } from '@/lib/types/shipping.types';
import { updateUserAddress } from '@/lib/actions/user.actions';
import { toast } from 'sonner';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// USER UPDATE ADDRESS HANDLER
export async function handleUpdateUserAddress(
	address: ShippingAddress,
	router: AppRouterInstance
) {
	const result = await updateUserAddress(address);
	const { success, message } = result;

	if (success) {
		toast.success(message);
		router.push('/payment-method');
	} else {
		toast.error(message);
	}
}
