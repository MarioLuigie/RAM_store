import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Order } from '@/lib/types/order.types';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils/utils';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/paths';
import { Check } from 'lucide-react';

export default function OrdersTable({
	orders,
	totalPages,
}: {
	orders: Order[];
	totalPages: number;
}) {
  console.log(totalPages)
	return (
		<div className="overflow-x-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Id</TableHead>
						<TableHead>Created at</TableHead>
						<TableHead>Total Price</TableHead>
						<TableHead>Paid at</TableHead>
						<TableHead>Delivered at</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders.map((order) => (
						<TableRow key={order.id}>
							<TableCell>{formatId(order.id)}</TableCell>
							<TableCell>
								{formatDateTime(order.createdAt).dateTime}
							</TableCell>
							<TableCell>{formatCurrency(order.totalPrice)}</TableCell>
							<TableCell>
								{order.isPaid && order.paidAt ? (
									<div className="flex items-center gap-2">
										<span>
											{formatDateTime(order.paidAt).dateTime}
										</span>
										<Check size={18} />
									</div>
								) : (
									<Badge className="bg-red-500">Not paid</Badge>
								)}
							</TableCell>
							<TableCell>
								{order.isDelivered && order.deliveredAt ? (
									<div className="flex items-center gap-2">
										<span>
											{formatDateTime(order.deliveredAt).dateTime}
										</span>
										<Check size={18} />
									</div>
								) : (
									<Badge className="bg-red-500">Not delivered</Badge>
								)}
							</TableCell>
							<TableCell>
								<Link href={`${ROUTES.ORDER}/${order.id}`}>
									<span className="px-4 py-2">Details</span>
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
