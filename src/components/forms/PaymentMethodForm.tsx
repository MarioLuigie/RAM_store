'use client';
// modules
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
// lib
import { PaymentMethod } from '@/lib/types/payment.types';
import { PaymentMethodSchema } from '@/lib/utils/validators';
// components
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { SHIPPING_ADDRESS_DEFAULT_VALUES } from '@/lib/constants';
import Loader from '@/components/shared/Loader';
import { ArrowRight } from 'lucide-react';
import { handleUpdateUserPaymentMethod } from '@/lib/handlers/user.handlers';
import { ROUTES } from '@/lib/constants/paths';
import { DEFAULT_PAYMENT_METHOD } from '@/lib/constants';

type typeField = ControllerRenderProps<PaymentMethod, 'type'>;

export default function PaymentMethodForm({
	preferredPaymentMethod,
}: {
	preferredPaymentMethod: string | null;
}) {
	const router = useRouter();

	// CREATE FORM FROM USEFORM
	const form = useForm<PaymentMethod>({
		resolver: zodResolver(PaymentMethodSchema),
		defaultValues: {
			type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
		},
	});

	const [isPending, startTransition] = useTransition();

	// ON SUBMIT HANDLER
	const onSubmit: SubmitHandler<PaymentMethod> = async (
		preferredPaymentMethodValue: PaymentMethod
	) => {
		console.log(preferredPaymentMethodValue);

		startTransition(async () => {
			await handleUpdateUserPaymentMethod(
				preferredPaymentMethodValue,
				router,
				ROUTES.PAYMENT_METHOD
			);
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-5"
			>
				{/* TYPE */}
				<div className="flex flex-col md:flex-row gap-5">
					<FormField
						control={form.control}
						name="type"
						render={({ field }: { field: typeField }) => (
							<FormItem className="w-full">
								<FormLabel>Payment method</FormLabel>
								<FormControl>
									<Input placeholder="Enter full name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* SUBMIT BUTTON */}
				<div className="flex justify-end gap-2 w-full mt-4">
					<Button
						type="submit"
						disabled={isPending}
						className="cursor-pointer"
						aria-label="Continue shipping"
					>
						{isPending ? (
							<Loader width={16} height={16} />
						) : (
							<ArrowRight />
						)}
						Continue
					</Button>
				</div>
			</form>
		</Form>
	);
}
