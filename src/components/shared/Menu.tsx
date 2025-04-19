// modules
import { ShoppingCart, UserIcon } from 'lucide-react'
//lib
import { ROUTES } from '@/lib/constants/paths'
// components
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ModeToggle from '@/components/shared/ModeToggle'

export default function Menu() {
	return (
		<div className="flex gap-3">
			{/* MODE TOGGLE DROPDOWN MENU */}
			<ModeToggle />

			{/* CART BUTTON */}
			<Button asChild variant="ghost">
				<Link href={ROUTES.CART}>
					<ShoppingCart /> Cart
				</Link>
			</Button>

			{/* LOGIN BUTTON */}
			<Button asChild>
				<Link href={ROUTES.SIGN_IN}>
					<UserIcon /> Sign In
				</Link>
			</Button>
		</div>
	)
}
