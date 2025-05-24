// lib
import { ROUTES } from '@/lib/constants/paths';
// components
import RedirectCard from '@/components/shared/RedirectCard';

export default function UnauthorizedAccessPage() {
	return (
		<RedirectCard
			title="Unauthorized Access"
			desc="You do not have permission to access this page"
			redirectPath={ROUTES.HOME}
			redirectLabel="Back to Home"
		/>
	);
}
