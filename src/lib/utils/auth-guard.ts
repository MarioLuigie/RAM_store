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
			message: 'Brak sesji lub użytkownika',
		};
	}

	if (session.user.role !== AuthRole.ADMIN) {
		return {
			isAdmin: false,
			message: 'Użytkownik nie jest adminem',
		};
	}

	return { isAdmin: true };
}
