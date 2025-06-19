'use client';
//modules
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// components
import SearchField from '@/components/shared/SearchField';

export default function AdminSearch() {
	const pathname = usePathname();
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
		<SearchField name="query" value={queryValue} onChange={handleChange} />
	);
}
