//lib
import { Cart } from '@/lib/types/cart.types';
import { ROUTES } from '@/lib/constants/paths';
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
import { ChangeProductQuantityWrapper } from '@/components/content/ChangeProductQuantityWrapper';
import Link from 'next/link';
import Image from 'next/image';

export default function CartTable({ cart }: { cart?: Cart }) {
	return (
		<div className="grid md:grid-cols-4 md:gap-5">
			<div className="overflow-x-auto md:col-span-3">
				<Table>
					<TableCaption>
						A list of your recent products added to the cart.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Product</TableHead>
							<TableHead className="text-center">Quantity</TableHead>
							<TableHead className="text-right">Price</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{cart?.items?.map((item) => (
							<TableRow key={item.slug}>
								<TableCell className="font-medium">
									<Link
										href={`${ROUTES.PRODUCT}/${item.slug}`}
										className="flex items-center gap-5"
									>
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
								<TableCell className="flex-center">
									{/* CHANGE QUANTITY OF ITEMS IN CART - ADDING OR REMOVING */}
									<ChangeProductQuantityWrapper item={item} />
								</TableCell>
								<TableCell className="text-right">{`$${(
									Number(item.price) * item.qty
								).toFixed(2)}`}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

// 'use client';
// //lib
// import { Cart } from '@/lib/types/cart.types';
// import {
// 	handleAddItemToCart,
// 	handleRemoveItemFromCart,
// } from '@/lib/handlers/cart.handlers';
// import { useAddItemToCartToast } from '@/lib/hooks/useAddItemToCartToast';
// import { useRemovedItemFromCartToast } from '@/lib/hooks/useRemovedItemFromCartToast';
// import { ROUTES } from '@/lib/constants/paths';
// // components
// import {
// 	Table,
// 	TableBody,
// 	TableCaption,
// 	TableCell,
// 	TableHead,
// 	TableHeader,
// 	TableRow,
// } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { Minus, Plus } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';

// export default function CartTable({ cart }: { cart?: Cart }) {
// 	console.log(cart);
// 	const { showAddItemToCartToast } = useAddItemToCartToast();
// 	const { showRemovedItemFromCartToast } = useRemovedItemFromCartToast();

// 	return (
// 		<div className="grid md:grid-cols-4 md:gap-5">
// 			<div className="overflow-x-auto md:col-span-3">
// 				<Table>
// 					<TableCaption>
// 						A list of your recent products added to the cart.
// 					</TableCaption>
// 					<TableHeader>
// 						<TableRow>
// 							<TableHead>Product</TableHead>
// 							<TableHead className="text-center">Quantity</TableHead>
// 							<TableHead className="text-right">Price</TableHead>
// 						</TableRow>
// 					</TableHeader>
// 					<TableBody>
// 						{cart?.items?.map((item) => (
// 							<TableRow key={item.slug}>
// 								<TableCell className="font-medium">
// 									<Link
// 										href={`${ROUTES.PRODUCT}/${item.slug}`}
// 										className="flex items-center gap-5"
// 									>
// 										<Image
// 											src={item.image}
// 											alt={item.name}
// 											className="w-[45px] h-[45px] flex-shrink-0 rounded-sm"
// 											width={45}
// 											height={45}
// 										/>
// 										<p>{item.name}</p>
// 									</Link>
// 								</TableCell>
// 								<TableCell className="flex-center">
// 									{/* CHANGE QUANTITY OF ITEMS IN CART - ADDING OR REMOVING */}
// 									<div className="flex items-center justify-between w-[140px]">
// 										<Button
// 											disabled={false}
// 											type="button"
// 											variant="outline"
// 											className="cursor-pointer"
// 											onClick={() =>
// 												handleRemoveItemFromCart(
// 													item.productId,
// 													showRemovedItemFromCartToast
// 												)
// 											}
// 										>
// 											<Minus className="h-4 w-4" />
// 										</Button>
// 										<span className="min-w-12 w-full flex-center text-xl px-2">
// 											{item.qty || '0'}
// 										</span>
// 										<Button
// 											disabled={false}
// 											type="button"
// 											variant="outline"
// 											className="cursor-pointer"
// 											onClick={() =>
// 												handleAddItemToCart(
// 													item,
// 													showAddItemToCartToast
// 												)
// 											}
// 										>
// 											<Plus className="h-4 w-4" />
// 										</Button>
// 									</div>
// 								</TableCell>
// 								<TableCell className="text-right">{`$${
// 									(Number(item.price) * item.qty).toFixed(2)
// 								}`}</TableCell>
// 							</TableRow>
// 						))}
// 					</TableBody>
// 				</Table>
// 			</div>
// 		</div>
// 	);
// }
