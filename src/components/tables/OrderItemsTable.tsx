// lib
import { ROUTES } from '@/lib/constants/paths';
// components
import Link from 'next/link';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils/utils';
import { CartItem } from '@/lib/types/cart.types';

export default function OrderItemsTable({ items }: { items: CartItem[] }) {
	return (
		<>
			<h2 className="text-xl  mb-3">Order Items</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Product</TableHead>
						<TableHead className="text-center">Quantity</TableHead>
						<TableHead className="text-right">Price</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{items.map((item) => (
						<TableRow key={item.slug}>
							<TableCell>
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

							<TableCell className="text-center">{item.qty}</TableCell>

							<TableCell className="text-right">{`${formatCurrency(
								(Number(item.price) * item.qty).toFixed(2)
							)}`}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
