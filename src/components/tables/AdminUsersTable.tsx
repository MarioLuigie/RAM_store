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
import { deleteOrder } from '@/lib/actions/order.actions';

export default function AdminUsersTable({ users }: { users: any[] }) {
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
						<TableHead className="text-center">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{formatId(user.id)}</TableCell>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.role}</TableCell>
							<TableCell>
								{formatDateTime(user.createdAt).dateTime}
							</TableCell>
							<TableCell className="flex-center gap-2">
								<Button
									asChild
									className="cursor-pointer"
									variant="outline"
								>
									<Link
										href={`${ROUTES.ADMIN_USERS}/${user.id}`}
									>
										Edit
									</Link>
								</Button>
								<DeleteDialog id={user.id} action={deleteOrder} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
