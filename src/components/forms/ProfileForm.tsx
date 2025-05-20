'use client';
import { UpdateProfile } from '@/lib/types/user.types';
import { UpdateProfileSchema } from '@/lib/utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
// modules
import { useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
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
		profileValues: UpdateProfile
	) => {
		console.log(profileValues);

		startTransition(async () => {});
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
						className="cursor-pointer"
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
