// modules
import { redirect } from 'next/navigation';
// lib
import { auth } from '@/config/auth';
import { getCart } from '@/lib/actions/cart.actions';
import { Cart } from '@/lib/types/cart.types';
import { ROUTES } from '@/lib/constants/paths';
import { ShippingAddress } from '@/lib/types/shipping.types';
import { getUserById } from '@/lib/actions/user.actions';
// componnets
import ShippingAddressForm from '@/components/forms/ShippingAddressForm';
import CheckoutSteps from '@/components/shared/CheckoutSteps';

export default async function ShippingAddressPage() {
	const cart: Cart | undefined = await getCart();

	if (!cart || cart.items.length === 0) redirect(ROUTES.CART);

	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) throw new Error('Not found user id');

	const { success, data: user } = await getUserById(userId);

  console.log("ShippingAddressPage:", success)

	return (
		<>
			<CheckoutSteps />
			<div className="max-w-md mx-auto space-y-4">
				<h1 className="h2-bold mt-4">Shipping Address</h1>
				<p className="text-sm text-muted-foreground">
					Please enter and address to ship to
				</p>
				<div className='mt-6'>
					<ShippingAddressForm address={user.address as ShippingAddress} />
				</div>
			</div>
		</>
	);
}
