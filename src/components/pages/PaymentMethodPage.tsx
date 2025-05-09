// lib
import { auth } from '@/config/auth';
import { getUserById } from '@/lib/actions/user.actions';
// components
import CheckoutSteps from '@/components/shared/CheckoutSteps';
import PaymentMethodForm from '@/components/forms/PaymentMethodForm';

export default async function PaymentMethodPage() {
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) throw new Error('User not found');

	const { data: user } = await getUserById(userId);

	return (
		<>
			<CheckoutSteps current={2} />
			<PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
		</>
	);
}
