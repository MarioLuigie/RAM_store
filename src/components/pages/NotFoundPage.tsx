// lib
import { ROUTES } from '@/lib/constants/paths';
// components
import RedirectCard from '@/components/shared/RedirectCard';

export default function NotFoundPage() {
	return (
		<RedirectCard
			title="Not Found"
			desc="Could not find requested resource"
			redirectPath={ROUTES.HOME}
			redirectLabel="Back to Home"
		/>
	);
}
