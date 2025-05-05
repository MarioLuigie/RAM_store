'use client';
// modules
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
//lib
import { Cart } from '@/lib/types/cart.types';
import { ROUTES } from '@/lib/constants/paths';
// components
import { Card, CardContent } from '@/components/ui/card';
import StyledPrice from '@/components/content/StyledPrice';
import { Button } from '@/components/ui/button';
import Loader from '@/components/shared/Loader';
import { ArrowRight } from 'lucide-react';

export default function SubtotalPanel({ cart }: { cart: Cart }) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
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

					<Button
						className="w-full cursor-pointer"
						disabled={isPending}
						onClick={() =>
							startTransition(() => {
								router.push(ROUTES.SHIPPING_ADDRESS);
							})
						}
						aria-label='Checkout'
					>
						{isPending ? (
							<Loader width={16} height={16}/>
						) : (
							<ArrowRight />
						)}{' '}
						Checkout
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
