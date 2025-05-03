'use client';
//lib
import { Cart } from '@/lib/types/cart.types';
// components
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/constants/paths';

export default function CartTable({ cart }: { cart?: Cart }) {
	console.log(cart);

	return (
		<div className="grid md:grid-cols-4 md:gap-5">
			<div className="overflow-x-auto md:col-span-3">
				<Table>
					<TableCaption>
						A list of your recent products added to the cart.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Product</TableHead>
							<TableHead className="text-center">Quantity</TableHead>
							<TableHead className="text-right">Price</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{cart?.items?.map((item) => (
							<TableRow key={item.slug}>
								<TableCell className="font-medium">
                  <Link href={`${ROUTES.PRODUCT}/${item.slug}`} className='flex items-center gap-5'>
                    <Image 
                      src={item.image}
                      alt={item.name}
                      className="w-[45px] h-[45px] flex-shrink-0 rounded-sm"
                      width={45}
                      height={45}
                    />
                    <p>{item.name}</p>
                  </Link>
                </TableCell>
								<TableCell className='text-center'>{item.qty}</TableCell>
								<TableCell className="text-right">{`$${item.price}`}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
