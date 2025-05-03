'use client';
//lib
import { Cart } from '@/lib/types/cart.types';
// components
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"


export default function CartTable({ cart }: { cart?: Cart }) {
	console.log(cart);

	return (
		<div className="grid md:grid-cols-4 md:gap-5">
			<div className="overflow-x-auto md:col-span-3">Table</div>
		</div>
	);
}
