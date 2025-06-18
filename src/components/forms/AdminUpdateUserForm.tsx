'use client';
// modules
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useTransition } from 'react';
import { ArrowRight } from 'lucide-react';
// lib
import { UpdateUser, User } from '@/lib/types/user.types';
import { UpdateUserSchema } from '@/lib/utils/validators';
// components
import {
  Form,
	// FormControl,
	// FormField,
	// FormItem,
	// FormLabel,
	// FormMessage,
} from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/shared/Loader';

export default function AdminUpdateUserForm({ user }: { user: User }) {
	const router: AppRouterInstance = useRouter();
	const [isPending, startTransition] = useTransition();
  
	const form = useForm<UpdateUser>({
		resolver: zodResolver(UpdateUserSchema),
		defaultValues: user,
	});

	// ON SUBMIT HANDLER
	const onSubmit: SubmitHandler<UpdateUser> = async (
		updateUserValues: UpdateUser
	) => {
		startTransition(async () => {
			console.log(updateUserValues);
			console.log(router);
		});
	};

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-5"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				{/* SUBMIT BUTTON */}
				<div className="flex justify-end gap-2 w-full mt-4">
					<Button
						type="submit"
						disabled={isPending}
						className="cursor-pointer min-w-40"
						aria-label="Continue"
					>
						{isPending ? (
							<Loader width={16} height={16} />
						) : (
							<ArrowRight />
						)}
						Update User
					</Button>
				</div>
			</form>
		</Form>
	);
}
