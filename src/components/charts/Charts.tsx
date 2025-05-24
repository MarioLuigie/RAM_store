'use client';

import { SalesData } from '@/lib/types/admin.types';
import { formatCurrency } from '@/lib/utils/utils';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	ResponsiveContainer,
	ReferenceLine,
} from 'recharts';

export default function Charts({
	data: { salesData },
}: {
	data: { salesData: SalesData };
}) {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart data={salesData}>
				<XAxis
					dataKey="month"
					stroke="#888888"
					fontSize={12}
					tickLine={true}
					axisLine={true}
				/>
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={true}
					axisLine={true}
					tickFormatter={(value) => formatCurrency(value)}
				/>
				<Bar
					dataKey="totalSales"
					fill="currentColor"
					radius={[5, 5, 0, 0]}
					className="fill-primary"
				/>
				<ReferenceLine
					y={450}
					stroke="#888888"
					strokeDasharray="4 2"
					label={{
						value: 'min',
						position: 'insideBottomLeft',
						fill: '#888888',
						fontSize: 12,
					}}
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}
