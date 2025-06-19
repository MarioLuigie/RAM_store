'use client';
//modules
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// components
import SearchField from '@/components/shared/SearchField';
import { ROUTES } from '@/lib/constants/paths';

export default function AdminSearch() {
	const pathname = usePathname();

	const formActionUrl = pathname.includes(ROUTES.ADMIN_ORDERS)
		? ROUTES.ADMIN_ORDERS
		: pathname.includes(ROUTES.ADMIN_USERS)
		? ROUTES.ADMIN_USERS
		: ROUTES.ADMIN_PRODUCTS;

	const searchParams = useSearchParams();
  
	const [queryValue, setQueryValue] = useState(
		searchParams.get('query') || ''
	);

	useEffect(() => {
		setQueryValue(searchParams.get('query') || '');
	}, [searchParams]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQueryValue(e.target.value);
	};

	return (
		<form action={formActionUrl} method="GET">
			<SearchField name="query" value={queryValue} onChange={handleChange} />
		</form>
	);
}
