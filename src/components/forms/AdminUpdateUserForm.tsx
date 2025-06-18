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
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/shared/Loader';
import { AuthRole } from '@/lib/constants/enums';
import { handleUpdateUser } from '@/lib/handlers/user.handlers';

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
			await handleUpdateUser(updateUserValues)
		});
	};

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-5 w-full min-w-[280px] max-w-[380px]"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				{/* NAME */}
				<div className="flex flex-col gap-5 w-full">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Enter product name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* EMAIL */}
				<div className="flex flex-col gap-5 w-full">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>E-mail</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter email"
										{...field}
										disabled
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* ROLE */}
				<div className="flex flex-col gap-5 w-full">
					<FormField
						control={form.control}
						name="role"
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Role</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder="Select a role" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value={AuthRole.ADMIN}>
											{AuthRole.ADMIN}
										</SelectItem>
										<SelectItem value={AuthRole.MODERATOR}>
											{AuthRole.MODERATOR}
										</SelectItem>
										<SelectItem value={AuthRole.USER}>
											{AuthRole.USER}
										</SelectItem>
										<SelectItem value={AuthRole.GUEST}>
											{AuthRole.GUEST}
										</SelectItem>
									</SelectContent>
								</Select>
								<FormDescription>
									You can manage user role{' '}
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* SUBMIT BUTTON */}
				<div className="flex justify-end gap-2 w-full mt-4">
					<Button
						type="submit"
						disabled={isPending}
						className="cursor-pointer min-w-30"
						aria-label="Update user"
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
