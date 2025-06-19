export default function FilteredBy({ query }: { query: string }) {
	return (
		<div className="text-muted-foreground">
			filtered by <i>&quot;{query}&quot;</i>
		</div>
	);
}
