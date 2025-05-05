'use client';
// modules
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
// lib
import { ShippingAddress } from '@/lib/types/shipping.types';
import { ShippingAddressSchema } from '@/lib/utils/validators';
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
import { SHIPPING_ADDRESS_DEFAULT_VALUES } from '@/lib/constants';
import Loader from '@/components/shared/Loader';
import { ArrowRight } from 'lucide-react';

type FullNameField = ControllerRenderProps<ShippingAddress, 'fullName'>;
type StreetAddressField = ControllerRenderProps<
	ShippingAddress,
	'streetAddress'
>;
type CityField = ControllerRenderProps<ShippingAddress, 'city'>;
type PostalCodeField = ControllerRenderProps<ShippingAddress, 'postalCode'>;
type CountryField = ControllerRenderProps<ShippingAddress, 'country'>;

export default function ShippingAddressForm({
	address,
}: {
	address: ShippingAddress;
}) {
	console.log(address);

	const router = useRouter();

	// CREATE FORM FROM USEFORM
	const form = useForm<ShippingAddress>({
		resolver: zodResolver(ShippingAddressSchema),
		defaultValues: address || SHIPPING_ADDRESS_DEFAULT_VALUES,
	});

	const [isPending, startTransition] = useTransition();

	// ON SUBMIT HANDLER
	const onSubmit: SubmitHandler<ShippingAddress> = async (
		shippingAddressFormValues: ShippingAddress
	) => {
		console.log(shippingAddressFormValues);
	};

	console.log(startTransition, router);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-5"
			>
				<div className="flex flex-col md:flex-row gap-5">
					<FormField
						control={form.control}
						name="fullName"
						render={({ field }: { field: FullNameField }) => (
							<FormItem className="w-full">
								<FormLabel>Full Name</FormLabel>
								<FormControl>
									<Input placeholder="Enter full name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col md:flex-row gap-5">
					<FormField
						control={form.control}
						name="streetAddress"
						render={({ field }: { field: StreetAddressField }) => (
							<FormItem className="w-full">
								<FormLabel>Street Address</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter street address"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col md:flex-row gap-5">
					<FormField
						control={form.control}
						name="city"
						render={({ field }: { field: CityField }) => (
							<FormItem className="w-full">
								<FormLabel>City</FormLabel>
								<FormControl>
									<Input placeholder="Enter city" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col md:flex-row gap-5">
					<FormField
						control={form.control}
						name="postalCode"
						render={({ field }: { field: PostalCodeField }) => (
							<FormItem className="w-full">
								<FormLabel>Postal Code</FormLabel>
								<FormControl>
									<Input placeholder="Enter postal code" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col md:flex-row gap-5">
					<FormField
						control={form.control}
						name="country"
						render={({ field }: { field: CountryField }) => (
							<FormItem className="w-full">
								<FormLabel>Country</FormLabel>
								<FormControl>
									<Input placeholder="Enter country" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex justify-end gap-2 w-full mt-4">
					<Button
						type="submit"
						disabled={isPending}
						className="cursor-pointer"
						aria-label='Continue shipping'
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
