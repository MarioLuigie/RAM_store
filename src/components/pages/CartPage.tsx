// lib
import { getCart } from '@/lib/actions/cart.actions';
import { ROUTES } from '@/lib/constants/paths';
// components
import CartTable from '@/components/tables/CartTable';
import Link from 'next/link';

export default async function CartPage() {
	const cart = await getCart();
	return (
		<div>
			<h1 className="py-4 h2-bold">Shopping Cart</h1>

			{!cart || cart.items.length === 0 ? (
				<div>
					<p>
						Your Cart is empty.{' '}
						<Link
							href={ROUTES.HOME}
							className="underline underline-offset-4"
						>
							Go shopping
						</Link>
					</p>
				</div>
			) : (
				<CartTable cart={cart} />
			)}
		</div>
	);
}
