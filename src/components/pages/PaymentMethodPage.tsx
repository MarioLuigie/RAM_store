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
			<div className="max-w-md mx-auto space-y-4">
				<h1 className="h2-bold mt-4">Payment Method</h1>
				<p className="text-sm text-muted-foreground">
					Please select your payment method
				</p>
				<div className="mt-6">
					<PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
				</div>
			</div>
		</>
	);
}
