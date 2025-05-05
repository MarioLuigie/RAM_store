import { ShippingAddress } from '@/lib/types/shipping.types';
import { updateUserAddress } from '@/lib/actions/user.actions';

// USER UPDATE ADDRESS HANDLER
export async function handleUpdateUserAddress(address: ShippingAddress) {
	const result = await updateUserAddress(address);
  const { success, data, message } = result;
}
