'use client';
// modules
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
// lib
import { PaymentMethod } from '@/lib/types/payment.types';
import { PaymentMethodSchema } from '@/lib/utils/validators';
import { handleUpdateUserPaymentMethod } from '@/lib/handlers/user.handlers';
import { ROUTES } from '@/lib/constants/paths';
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from '@/lib/constants';
// components
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
// import { SHIPPING_ADDRESS_DEFAULT_VALUES } from '@/lib/constants';
import Loader from '@/components/shared/Loader';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TypeFieldRHF } from '@/lib/types';

// type typeField = ControllerRenderProps<PaymentMethod, 'type'>;

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
				ROUTES.PLACE_ORDER
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
						render={({ field }: { field: TypeFieldRHF }) => (
							<FormItem className="space-y-3">
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex flex-col space-y-1"
									>
										{PAYMENT_METHODS.map((paymentMethod) => (
											<FormItem
												key={paymentMethod}
												className="flex items-center space-x-3 space-y-0"
											>
												<FormControl>
													<RadioGroupItem
														value={paymentMethod}
														checked={
															field.value === paymentMethod
														}
													/>
												</FormControl>
												<FormLabel className="font-normal">
													{paymentMethod}
												</FormLabel>
											</FormItem>
										))}
									</RadioGroup>
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
