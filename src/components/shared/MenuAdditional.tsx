'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/utils';
import React from 'react';
import { MENU_ITEMS_ADDITIONAL } from '@/lib/constants';
import { ICON_MAP } from '@/lib/constants/icons';

export default function MenuAdditional({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	const pathName = usePathname();

	return (
		<nav className={cn('flex items-center space-x-4', className)} {...props}>
			{MENU_ITEMS_ADDITIONAL.map((item) => {
        const Icon = ICON_MAP[item.label];
				return (
					<Link
						key={item.path}
						href={item.path}
						className={cn(
							'flex items-center gap-2 text-sm font-bold transition-colors hover:text-primary',
							pathName.includes(item.path)
								? ''
								: 'text-muted-foreground font-normal'
						)}
					>
            <Icon size={20} />
						{item.label}
					</Link>
				);
			})}
		</nav>
	);
}
