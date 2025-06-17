import { Badge } from '../ui/badge';
import { AuthRole } from '@/lib/constants/enums';

export default function UserRoleBadge({ userRole }: { userRole: AuthRole }) {
	const createBadgeVar = (
		role: AuthRole
	): { variant: 'default' | 'outline' | 'secondary' } => {
		if (role === AuthRole.ADMIN) {
			return {
				variant: 'secondary',
			};
		} else {
			return {
				variant: 'outline',
			};
		}
	};
	return (
		<Badge
			variant={createBadgeVar(userRole).variant}
			className="min-w-[60px] h-[24px]"
		>
			{userRole}
		</Badge>
	);
}
