'use client';
// modules
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
	page: number | string;
	totalPages: number;
	urlParamName?: string;
};

export default function Pagination({
	page,
	totalPages,
	urlParamName,
}: PaginationProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	return (
		<div className="flex-center mt-8">
			<div className="flex gap-2">
				<Button variant="outline" className="" disabled={Number(page) <= 1}>
					<ChevronLeft className="size-6" />
				</Button>

				<Button variant="outline" className="" disabled={Number(page) >= totalPages}>
					<ChevronRight className="size-6" />
				</Button>
			</div>
		</div>
	);
}
