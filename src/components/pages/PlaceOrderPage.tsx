// modules
import { redirect } from 'next/navigation';
// lib
import { getCart } from '@/lib/actions/cart.actions';
import { auth } from '@/config/auth';
import { getUserById } from '@/lib/actions/user.actions';
import { ROUTES } from '@/lib/constants/paths';
import { ShippingAddress } from '@/lib/types/shipping.types';
// components
import Link from 'next/link';
import CheckoutSteps from '@/components/shared/CheckoutSteps';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import OrderItemsTable from '@/components/tables/OrderItemsTable';
import OrderPrices from '@/components/content/OrderPrices';
import PlaceOrderForm from '@/components/forms/PlaceOrderForm';

export default async function PlaceOrderPage() {
	const cart = await getCart();
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) throw new Error('User not found');

	const { data: user } = await getUserById(userId);

	if (!cart || cart.items.length === 0) redirect(ROUTES.CART);
	if (!user.address) redirect(ROUTES.SHIPPING_ADDRESS);
	if (!user.paymentMethod) redirect(ROUTES.PAYMENT_METHOD);

	const userAddress = user.address as ShippingAddress;

	console.log(userAddress);

	return (
		<>
			<CheckoutSteps current={3} />
			<div className="mx-auto space-y-4 mb-4">
				<h1 className="h2-bold mt-4">Place Order</h1>
				<p className="text-sm text-muted-foreground">Finalize your order</p>
			</div>
			<div className="grid md:grid-cols-3 md:gap-5">
				<div className="md:col-span-2 overflow-x-auto space-y-4">
					{/* CARD WITH ADDRESS INFO*/}
					<Card>
						<CardContent className="p-4 gap-4">
							<h2 className="text-xl  mb-3">Shipping Address</h2>
							<p>{userAddress.fullName}</p>
							<p>
								{userAddress.streetAddress}, {userAddress.city}{' '}
								{userAddress.postalCode}, {userAddress.country}{' '}
							</p>
							<div className="mt-3">
								<Link href={ROUTES.SHIPPING_ADDRESS}>
									<Button variant="outline" className="cursor-pointer">
										Edit
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>

					{/* CARD WITH PAYMENT METHOD INFO*/}
					<Card>
						<CardContent className="p-4 gap-4">
							<h2 className="text-xl  mb-3">Payment Method</h2>
							<p>{user.paymentMethod}</p>
							<div className="mt-3">
								<Link href={ROUTES.PAYMENT_METHOD}>
									<Button variant="outline" className="cursor-pointer">
										Edit
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>

					{/* CARD WITH ORDER ITEMS INFO*/}
					<Card>
						<CardContent className="p-4 gap-4">
							<OrderItemsTable items={cart.items} />
						</CardContent>
					</Card>
				</div>

				<div>
					<Card>
						<CardContent className="p-4 gap-4 space-y-4">
							<OrderPrices
								itemsPrice={cart.itemsPrice}
								shippingPrice={cart.shippingPrice}
								taxPrice={cart.taxPrice}
								totalPrice={cart.totalPrice}
							/>
							<PlaceOrderForm />
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}
