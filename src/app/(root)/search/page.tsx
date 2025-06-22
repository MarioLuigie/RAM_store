import SearchPage from '@/components/pages/SearchPage';

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ category: string; query: string }>;
}) {
	const { category, query } = await searchParams;

	return <SearchPage category={category} query={query} />;
}
