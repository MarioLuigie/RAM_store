'use client';
// modules
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { buildUrlQuery } from '@/lib/utils/utils';

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

	const handleClick = (type: string) => {
		const pageNumber = type === 'next' ? Number(page) + 1 : Number(page) - 1;

    const newUrl = buildUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageNumber.toString(),
    });

    router.push(newUrl);
	};

	return (
		<div className="flex-center mt-8">
			<div className="flex gap-2">
				<Button
					variant="outline"
					className=""
					disabled={Number(page) <= 1}
					onClick={() => handleClick('prev')}
				>
					<ChevronLeft className="size-6" />
				</Button>

				<Button
					variant="outline"
					className=""
					disabled={Number(page) >= totalPages}
					onClick={() => handleClick('next')}
				>
					<ChevronRight className="size-6" />
				</Button>
			</div>
		</div>
	);
}
