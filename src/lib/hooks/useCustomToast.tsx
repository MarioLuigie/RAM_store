'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/utils';

// Custom hook
export function useCustomToast() {
	const showCustomToast = useCallback(
		(message: string, isSuccess: boolean = true) => {
			toast.custom((id) => (
				<div
					className={cn(
						'relative flex items-center justify-between gap-6 px-4 py-2 rounded-md border-[1px] border-[#e9e9e9] dark:border-[#3d3d3d] shadow-md dark:bg-[#252525] bg-[#f7f7f7]',
						isSuccess
							? 'dark:bg-[#252525] bg-[#f7f7f7] dark:text-zinc-100 text-[#383838]'
							: 'bg-red-200 dark:bg-red-300 dark:text-[#383838] text-[#383838]'
					)}
				>
					{/* MESSAGE */}
					<div>
						<p className="text-sm pr-6">{message}</p>
					</div>

					<button
						onClick={() => toast.dismiss(id)}
						className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 w-4"
					>
						<X className="w-4" />
					</button>
				</div>
			));
		},
		[]
	);

	return { showCustomToast };
}
