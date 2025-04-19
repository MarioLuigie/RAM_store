// modules
import { EllipsisVertical, ShoppingCart, UserIcon } from 'lucide-react'
//lib
import { ROUTES } from '@/lib/constants/paths'
// components
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ModeToggle from '@/components/shared/ModeToggle'
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetTitle,
	SheetDescription,
} from '@/components/ui/sheet'

const MenuItems = () => (
	<>
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
	</>
)

export default function Menu() {
	return (
		<>
			{/* DESKTOP MENU */}
			<nav className="hidden md:flex gap-3">
				<MenuItems />
			</nav>

			{/* MOBILE MENU */}
			<nav className="md:hidden flex">
				<Sheet>
					<SheetTrigger className="align-middle cursor-pointer">
						<EllipsisVertical />
					</SheetTrigger>
					<SheetContent className="flex flex-col items-start">
						<SheetTitle className="w-full p-5 border-b">
							Menu
						</SheetTitle>
						<SheetDescription></SheetDescription>
						<div className="flex flex-col items-start gap-3 w-full px-4">
							<MenuItems />
						</div>
					</SheetContent>
				</Sheet>
			</nav>
		</>
	)
}
