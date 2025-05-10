// lib
import { getCart } from '@/lib/actions/cart.actions';
import { auth } from '@/config/auth';
// components
import CheckoutSteps from '@/components/shared/CheckoutSteps';
import { getUserById } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/constants/paths';

export default async function PlaceOrderPage() {
	const cart = await getCart();
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) throw new Error('User not found');

	const { data: user } = await getUserById(userId);

	if (!cart || cart.items.length === 0) redirect(ROUTES.CART);
	if (!user.address) redirect(ROUTES.SHIPPING_ADDRESS);
	if (!user.paymentMethod) redirect(ROUTES.PAYMENT_METHOD)

	return (
		<>
			<CheckoutSteps current={3} />
			<div>PLACE ORDER</div>
		</>
	);
}
