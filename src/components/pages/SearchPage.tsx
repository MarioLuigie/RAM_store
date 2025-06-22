export default function SearchPage({
	category,
	q,
}: {
	category: string;
	q: string;
}) {
	return <div>SEARCH PAGE{' '}{category}{' '}{q}</div>;
}
