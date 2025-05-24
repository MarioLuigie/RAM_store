'use client';

type SalesDataProps = {
	month: string;
	totalSales: number
}[];

export default function Charts({
	data: { salesData },
}: {
	data: { salesData: SalesDataProps };
}) {
	return <div>{salesData[0].month}</div>;
}
