//lib
import { ROUTES } from '@/lib/constants/paths'
// modules
import { UserIcon } from 'lucide-react'
// components
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LoggedOutUserButton() {
	return (
		<>
			{/* LOGIN BUTTON */}
			<Button asChild>
				<Link href={ROUTES.SIGN_IN}>
					<UserIcon /> Sign In
				</Link>
			</Button>
		</>
	)
}
