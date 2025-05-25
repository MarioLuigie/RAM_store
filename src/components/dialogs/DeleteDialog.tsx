'use client';

import { useCustomToast } from '@/lib/hooks/useCustomToast';
import { useTransition } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type DeleteDialogProps = {
	id: string;
	action: (id: string) => Promise<{ success: boolean; message: string }>;
};

export default function DeleteDialog({ id, action }: DeleteDialogProps) {
	const { showCustomToast } = useCustomToast();
	const [isPending, startTransition] = useTransition();

	const handleDeleteClick = async () => {
		startTransition(async () => {
			const { success, message } = await action(id);

			if (success) {
				showCustomToast(message, success);
			} else {
				showCustomToast(message, success);
			}
		});
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger className="cursor-pointer">
				Delete
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete
						order and remove from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleDeleteClick} disabled={isPending}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
