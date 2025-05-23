import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/config/auth';
import { getOrderSummary } from '@/lib/actions/order.actions';
import { AuthRole } from '@/lib/constants/enums';
import { formatCurrency } from '@/lib/utils/utils';
import { BadgeEuro, CreditCard } from 'lucide-react';

export default async function AdminOverviewPage() {
	const session = await auth();
	const isAdmin = session?.user?.role === AuthRole.ADMIN;

	if (!isAdmin) {
		throw new Error('User is not authorized');
	}

	const { success, data: summary, message } = await getOrderSummary();

	console.log('SUMMARY:', summary);

	return (
		<div className="space-y-2">
			<h1 className="h2-bold">Dashboard</h1>
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
								summary?.totalSales._sum.totalPrice?.toString() || 0
							)}
						</div>
					</CardContent>
				</Card>

        {/* SALES */}
				<Card className="gap-3">
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-sm font-medium">
							Sales
						</CardTitle>
						<CreditCard />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatCurrency(
								summary?.totalSales._sum.totalPrice?.toString() || 0
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
