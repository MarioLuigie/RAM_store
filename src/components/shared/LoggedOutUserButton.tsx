//lib
import { ROUTES } from '@/lib/constants/paths'
// modules
import { UserIcon } from 'lucide-react'
// components
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LoggedOutUserButton({
	title = 'Sign In',
}: {
	title?: string
}) {
	return (
		<>
			{/* LOGIN BUTTON */}
			<Button asChild aria-label='Sign in'>
				<Link href={ROUTES.SIGN_IN}>
					<UserIcon />
					{title}
				</Link>
			</Button>
		</>
	)
}
