import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { auth } from '@/config/auth';
import { getOrderSummary } from '@/lib/actions/order.actions';
import { AuthRole } from '@/lib/constants/enums';
import { ROUTES } from '@/lib/constants/paths';
import {
	formatCurrency,
	formatDateTime,
	formatNumber,
} from '@/lib/utils/utils';
import { BadgeEuro, Barcode, CreditCard, Users } from 'lucide-react';
import Link from 'next/link';
import Charts from '@/components/charts/Charts';

export default async function AdminOverviewPage() {
	const session = await auth();
	const isAdmin = session?.user?.role === AuthRole.ADMIN;

	if (!isAdmin) {
		throw new Error('User is not authorized');
	}

	const { success, data: summary, message } = await getOrderSummary();

	if (!success || !summary) {
		throw new Error(
			`Failed to load order summary: ${message || 'Unknown error'}`
		);
	}

	console.log('SUMMARY:', summary);

	return (
		<div className="space-y-4">
			<h1 className="h2-bold">Dashboard</h1>
			{/* CARDS */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{/* TOTAL REVENUE */}
				<Card className="gap-3">
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-sm font-medium">
							Total Revenue
						</CardTitle>
						<BadgeEuro />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatCurrency(
								summary.totalSales._sum.totalPrice?.toString() || 0
							)}
						</div>
					</CardContent>
				</Card>

				{/* SALES */}
				<Card className="gap-3">
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-sm font-medium">Sales</CardTitle>
						<CreditCard />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatNumber(summary.ordersCount)}
						</div>
					</CardContent>
				</Card>

				{/* CUSTOMERS */}
				<Card className="gap-3">
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-sm font-medium">
							Customers
						</CardTitle>
						<Users />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatNumber(summary.usersCount)}
						</div>
					</CardContent>
				</Card>

				{/* PRODUCTS */}
				<Card className="gap-3">
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-sm font-medium">
							Products
						</CardTitle>
						<Barcode />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatNumber(summary.productsCount)}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* CHARTS */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				{/* OVERVIEW CHART */}
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>Overview</CardTitle>
					</CardHeader>
					<CardContent>
            <Charts data={{
              salesData: summary.salesData,
            }} />
          </CardContent>
				</Card>

				{/* SALES CHART */}
				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>Recent Sales</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Buyer</TableHead>
									<TableHead>Date</TableHead>
									<TableHead>Total</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{summary.latestSales.map((order) => (
									<TableRow key={order.id}>
										{/* USER NAME */}
										<TableCell>
											{order.user.name
												? order.user.name
												: 'Deleted User'}
										</TableCell>

										{/* DATE */}
										<TableCell>
											{formatDateTime(order.createdAt).dateOnly}
										</TableCell>

										{/* TOTAL */}
										<TableCell>
											{formatCurrency(order.totalPrice)}
										</TableCell>

										{/* ACTIONS */}
										<TableCell>
											<Link href={`${ROUTES.ORDER}/${order.id}`} target='blank'>
                        <span className='px-2'>Details</span>
                      </Link>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

// SUMMARY OBJECT
// SUMMARY: {
//   ordersCount: 3,
//   productsCount: 6,
//   usersCount: 3,
//   totalSales: { _sum: { totalPrice: 708.87 } },
//   latestSales: [
//     {
//       id: 'e8e33708-467b-4a7f-82ae-a4db61c67b50',
//       userId: 'd764e1da-6f1b-4162-89db-bff61f290857',
//       shippingAddress: [Object],
//       paymentMethod: 'PayPal',
//       paymentResult: [Object],
//       itemsPrice: '159.98',
//       shippingPrice: '0',
//       taxPrice: '33.6',
//       totalPrice: '193.58',
//       isPaid: true,
//       paidAt: 2025-05-18T20:38:18.900Z,
//       isDelivered: false,
//       deliveredAt: null,
//       createdAt: 2025-05-18T20:37:32.055Z,
//       user: [Object]
//     },
//     {
//       id: 'a7503bda-d16a-4277-9048-860187b5d68e',
//       userId: 'd764e1da-6f1b-4162-89db-bff61f290857',
//       shippingAddress: [Object],
//       paymentMethod: 'PayPal',
//       paymentResult: [Object],
//       itemsPrice: '179.98',
//       shippingPrice: '0',
//       taxPrice: '37.8',
//       totalPrice: '217.78',
//       isPaid: true,
//       paidAt: 2025-05-18T19:41:15.317Z,
//       isDelivered: false,
//       deliveredAt: null,
//       createdAt: 2025-05-18T19:38:39.047Z,
//       user: [Object]
//     },
//     {
//       id: 'a5cf250f-cdaa-4e9b-b76a-c221fa1517a7',
//       userId: 'd764e1da-6f1b-4162-89db-bff61f290857',
//       shippingAddress: [Object],
//       paymentMethod: 'PayPal',
//       paymentResult: [Object],
//       itemsPrice: '245.88',
//       shippingPrice: '0',
//       taxPrice: '51.63',
//       totalPrice: '297.51',
//       isPaid: true,
//       paidAt: 2025-05-17T20:46:56.317Z,
//       isDelivered: false,
//       deliveredAt: null,
//       createdAt: 2025-05-17T15:29:03.045Z,
//       user: [Object]
//     }
//   ],
//   salesData: [ { month: '05/25', totalSales: 708.87 } ]
// }
