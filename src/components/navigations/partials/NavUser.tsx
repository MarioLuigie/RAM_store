// lib
import { auth } from '@/config/auth';
// components
import LoggedOutUserButton from '@/components/shared/LoggedOutUserButton';
import LoggedInUserButton from '../../shared/LoggedInUserButton';

export default async function NavUser() {
	const session = await auth();

	if (!session) {
		return <LoggedOutUserButton />;
	}

	if (session && session?.user)
		return <LoggedInUserButton user={session?.user} />;
}
