// modules
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/config/auth';
// components
import ProfileForm from '@/components/forms/ProfileForm';

export default async function ProfilePage() {
	const session = await auth();

	return (
		<SessionProvider session={session}>
			<div className="max-w-md mx-auto space-y-2">
				<h2 className="h2-bold">Profile</h2>
				<p>Hi! {session?.user?.name}</p>
				<div className='mt-12'>
					<ProfileForm />
				</div>
			</div>
		</SessionProvider>
	);
}
