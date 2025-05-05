'use client';
// modules
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
// lib
import { ShippingAddress } from '@/lib/types/shipping.types';
import { ShippingAddressSchema } from '@/lib/utils/validators';

export default function ShippingAddressForm({
	address,
}: {
	address: ShippingAddress;
}) {
	console.log(address);

  const router = useRouter();

	return <div>SHIPPING ADDRESS FORM</div>;
}
