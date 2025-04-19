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
			<nav className="flex md:hidden gap-3">
				<Sheet>
					<SheetTrigger className="align-middle">
						<EllipsisVertical />
					</SheetTrigger>
					<SheetContent className="flex flex-col items-start">
						<SheetTitle>Menu</SheetTitle>
						<MenuItems />
						<SheetDescription></SheetDescription>
					</SheetContent>
				</Sheet>
			</nav>
		</>
	)
}
