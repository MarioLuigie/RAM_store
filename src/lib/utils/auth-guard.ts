import { auth } from '@/config/auth';
import { redirect } from 'next/navigation';
import { AuthRole } from '../constants/enums';
import { ROUTES } from '../constants/paths';

export async function requireAdmin() {
	const session = await auth();

	if (session?.user?.role !== AuthRole.ADMIN) {
		redirect(ROUTES.UNAUTHORIZED_ACCESS);
	}

	return session;
}

export async function checkIsAdmin(): Promise<{
	isAdmin: boolean;
	message?: string;
}> {
	const session = await auth();

	if (!session || !session.user || !session.user.role) {
		return {
			isAdmin: false,
			message: 'Not found user session',
		};
	}

	if (session.user.role !== AuthRole.ADMIN) {
		return {
			isAdmin: false,
			message: 'User is not the admin',
		};
	}

	return { isAdmin: true };
}
