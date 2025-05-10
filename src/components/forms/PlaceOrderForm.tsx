'use client';
// modules
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
// lib
import { createOrder } from '@/lib/actions/order.actions';
// components
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Loader from '@/components/shared/Loader';

export default function PlaceOrderForm() {
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { redirectTo } = await createOrder();

		if (redirectTo) {
			router.push(redirectTo);
		}
	};

	const PlaceOrderButton = () => {
		const { pending } = useFormStatus();
		return (
			<Button disabled={pending} className="w-full mt-4 cursor-pointer">
				{pending ? (
					<Loader width={16} height={16} />
				) : (
					<Check width={16} height={16} />
				)}{' '}
				Place Order
			</Button>
		);
	};

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<PlaceOrderButton />
		</form>
	);
}
