// lib
import { ROUTES } from '@/lib/constants/paths';
import { checkIsAdmin } from '@/lib/utils/auth-guard';
// components
import RedirectCard from '@/components/shared/RedirectCard';

export default async function NotFoundPage() {
	const { isAdmin } = await checkIsAdmin();

	return (
		<RedirectCard
			title="Not Found"
			desc="Could not find requested resource"
			redirectPath={isAdmin ? ROUTES.ADMIN_OVERVIEW : ROUTES.HOME}
			redirectLabel={isAdmin ? "Back to Admin Dashboard" : "Back to Home"}
		/>
	);
}
