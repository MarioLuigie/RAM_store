//lib
import { Cart } from '@/lib/types/cart.types';
// components
import { Card, CardContent } from '@/components/ui/card';
import StyledPrice from '@/components/content/StyledPrice';
import { Button } from '@/components/ui/button';

export default function SubtotalPanel({ cart }: { cart: Cart}) {
	return (
		<div>
			<Card>
				<CardContent className="p-4 gap-4">
					<div className="flex gap-2 pb-3 text-xl">
						<p>Subtotal:</p>
						<p>
							{cart?.items.reduce((acc, next) => acc + next.qty, 0)}{' '}
							products
						</p>
					</div>

					<div className="flex items-center gap-2 pb-5">
						<p className="text-xl">Price:</p>
						{cart && <StyledPrice price={cart?.itemsPrice} />}
					</div>

					<Button className="w-full">Checkout</Button>
				</CardContent>
			</Card>
		</div>
	);
}
