'use client';
// modules
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// lib
import { UpdateProfile } from '@/lib/types/user.types';
import { UpdateProfileSchema } from '@/lib/utils/validators';
import { handleUpdateProfile } from '@/lib/handlers/user.handlers';
// components
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Loader from '@/components/shared/Loader';

export default function ProfileForm() {
	const { data: session, update } = useSession();
	const router: AppRouterInstance = useRouter();

	const form = useForm<UpdateProfile>({
		resolver: zodResolver(UpdateProfileSchema),
		defaultValues: {
			name: session?.user?.name ?? '',
			email: session?.user?.email ?? '',
		},
	});

	const [isPending, startTransition] = useTransition();

	// ON SUBMIT HANDLER
	const onSubmit: SubmitHandler<UpdateProfile> = async (
		updateProfileValues: UpdateProfile
	) => {
		startTransition(async () => {
			await handleUpdateProfile(
				updateProfileValues,
				session,
				update,
				router
			);
		});
	};

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-5"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				{/* EMAIL */}
				<div className="flex flex-col gap-5">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>E-mail</FormLabel>
								<FormControl>
									<Input disabled placeholder="E-mail" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* NAME */}
				<div className="flex flex-col gap-5">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Enter name" {...field} />
								</FormControl>
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
						className="cursor-pointer min-w-40"
						aria-label="Continue"
					>
						{isPending ? (
							<Loader width={16} height={16} />
						) : (
							<ArrowRight />
						)}
						Update Profile
					</Button>
				</div>
			</form>
		</Form>
	);
}
