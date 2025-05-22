'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/utils';
import React from 'react';
import { ADMIN_MENU_ITEMS } from '@/lib/constants';
import { ADMIN_MENU_ICON_MAP } from '@/lib/constants/icons';

export default function AdminMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();

  return (
    <nav className={cn('flex items-center gap-4', className)} {...props}>
      {ADMIN_MENU_ITEMS.map((item) => {
        const Icon = ADMIN_MENU_ICON_MAP[item.label];
        return (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              'min-w-20 flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
              pathName.includes(item.path)
                ? ''
                : 'text-muted-foreground'
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
