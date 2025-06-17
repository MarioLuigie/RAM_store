import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import Link from 'next/link';
import DeleteDialog from '../dialogs/DeleteDialog';
import { formatDateTime, formatId } from '@/lib/utils/utils';
import { ROUTES } from '@/lib/constants/paths';
import { deleteUser } from '@/lib/actions/user.actions';
import { AuthRole } from '@/lib/constants/enums';
import { Badge } from '../ui/badge';
import { User } from '@/lib/types/user.types';

export default function AdminUsersTable({ users }: { users: User[] }) {
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
		<div className="overflow-x-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>User Id</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>E-mail</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Created at</TableHead>
						<TableHead>Updated at</TableHead>
						<TableHead>Verified</TableHead>
						<TableHead className="text-center">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{formatId(user.id)}</TableCell>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>
								<Badge
									variant={createBadgeVar(user.role).variant}
									className="min-w-[60px] h-[24px]"
								>
									{user.role}
								</Badge>
							</TableCell>
							<TableCell>
								{formatDateTime(user.createdAt).dateTime}
							</TableCell>
							<TableCell>
								{formatDateTime(user.updatedAt).dateTime}
							</TableCell>
							<TableCell>
								{user.emailVerified === null
									? 'Not verified!'
									: formatDateTime(user.emailVerified).dateTime}
							</TableCell>
							<TableCell className="flex-center gap-2">
								<Button
									asChild
									className="cursor-pointer"
									variant="outline"
								>
									<Link href={`${ROUTES.ADMIN_USERS}/${user.id}`}>
										Edit
									</Link>
								</Button>
								<DeleteDialog
									id={user.id}
									item="user"
									action={deleteUser}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
