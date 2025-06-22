import SearchPage from '@/components/pages/SearchPage';

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ category: string; q: string }>;
}) {
	const { category, q } = await searchParams;
  
	return <SearchPage category={category} q={q} />;
}
