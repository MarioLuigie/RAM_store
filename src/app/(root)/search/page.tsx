import SearchPage from '@/components/pages/SearchPage';

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{
		category?: string;
		query?: string;
		price?: string;
		rating?: string;
		sort?: string;
		page?: string;
	}>;
}) {
	const {
		category = 'all',
		query = 'all',
		price = 'all',
		rating = 'all',
		sort = 'newest',
		page = '1',
	} = await searchParams;

  const queries = {
    category,
    query,
    price,
    rating,
    sort,
    page,
  }

	return <SearchPage queries={queries} />;
}
