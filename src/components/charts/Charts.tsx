'use client';

import { SalesData } from "@/lib/types/admin.types";

export default function Charts({
	data: { salesData },
}: {
	data: { salesData: SalesData };
}) {
	return <div>{salesData[0].month}</div>;
}
