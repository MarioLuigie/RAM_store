export default function SearchPage({
	category,
	query,
}: {
	category: string;
	query: string;
}) {
	return <div>SEARCH PAGE{' '}{category}{' '}{query}</div>;
}
