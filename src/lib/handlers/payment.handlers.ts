// lib
import {
	approvePayPalOrder,
	createPayPalOrder,
} from '@/lib/actions/payment.actions';

type ShowCustomToast = (message: string, success: boolean) => void;

export async function handleCreatePayPalOrder(
	orderId: string,
	showCustomToast: ShowCustomToast
): Promise<string> {
	const {
		success,
		data: payPalOrderId,
		message,
	} = await createPayPalOrder(orderId);

	if (success) {
		showCustomToast(message, success);
		return payPalOrderId;
	} else {
		showCustomToast(message, success);
		throw new Error(message || 'Błąd podczas tworzenia zamówienia PayPal');
	}
}

export async function handleApprovePayPalOrder(
	orderId: string,
	data: {
		orderID: string;
	},
	showCustomToast: ShowCustomToast
) {
	const { success, message } = await approvePayPalOrder(orderId, data);

	if (success) {
		showCustomToast(message, success);
	} else {
		showCustomToast(message, success);
	}
}
