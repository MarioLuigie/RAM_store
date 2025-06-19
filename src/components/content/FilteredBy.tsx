import Link from 'next/link';
import { Button } from '../ui/button';

export default function FilteredBy({
	query,
	redirect,
}: {
	query: string;
	redirect: string;
}) {
	return (
		<div className="text-muted-foreground flex gap-2 items-end">
			<p>
				filtered by <i>&quot;{query}&quot;</i>
			</p>
			<Link href={redirect}>
				<Button variant="outline" size='sm'>Clear filter</Button>
			</Link>
		</div>
	);
}
