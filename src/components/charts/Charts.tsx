'use client';

export default function Charts({
	data: { salesData },
}: {
	data: { salesData: { month: string; totalSales: number }[] };
}) {
	return <div>{salesData[0].month}</div>;
}
