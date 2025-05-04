// modules
import { EllipsisVertical, ShoppingCart } from 'lucide-react'
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
import NavUser from '@/components/shared/NavUser'

const MenuItems = () => (
	<>
		{/* MODE TOGGLE DROPDOWN MENU BUTTON */}
		<ModeToggle />

		{/* CART BUTTON */}
		<Button asChild variant="ghost" aria-label='Go to cart'>
			<Link href={ROUTES.CART}>
				<ShoppingCart /> Cart
			</Link>
		</Button>

		{/* SIGN IN BUTTON  OR LOGGED IN USER BUTTONS DROPDOWN MENU - depend on there is the session user or not*/}
		<NavUser />
	</>
)

export default function Menu() {
	return (
		<>
			{/* DESKTOP MENU */}
			<nav className="hidden md:flex md:items-center gap-3">
				{/* MENU CONTENT */}
				<MenuItems />
			</nav>

			{/* MOBILE MENU */}
			<nav className="md:hidden flex">
				<Sheet>
					<SheetTrigger className="align-middle cursor-pointer">
						<EllipsisVertical />
					</SheetTrigger>
					<SheetContent className="flex flex-col items-start">
						<SheetTitle className="w-full p-5 border-b">Menu</SheetTitle>
						<SheetDescription></SheetDescription>
						{/* MENU CONTENT */}
						<div className="flex flex-col items-start gap-3 w-full px-4">
							<MenuItems />
						</div>
					</SheetContent>
				</Sheet>
			</nav>
		</>
	)
}
