// modules
import { EllipsisVertical, ShoppingCart } from 'lucide-react';
//lib
import { ROUTES } from '@/lib/constants/paths';
// components
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ModeToggle from '@/components/shared/ModeToggle';
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetTitle,
	SheetDescription,
} from '@/components/ui/sheet';
import NavUser from '@/components/navigations/partials/NavUser';
import CartBadge from '@/components/content/CartBadge';
import { CartItem } from '@/lib/types/cart.types';

const MenuItems = ({ cartItemsQty }: { cartItemsQty: number }) => (
	<>
		{/* MODE/DARK/LIGHT/TOGGLE DROPDOWN MENU BUTTON */}
		<ModeToggle />

		{/* CART BUTTON */}
		<Button asChild variant="ghost" aria-label="Go to cart" className='px-1 py-0.5'>
			<Link href={ROUTES.CART}>
				<div className="flex-center gap-2 relative">
					<ShoppingCart className="z-20" />
					<CartBadge quantity={cartItemsQty} /> Cart
				</div>
			</Link>
		</Button>

		{/* SIGN IN BUTTON  OR LOGGED IN USER BUTTONS DROPDOWN MENU - depend on there is the session user or not*/}
		<NavUser />
	</>
);

export default function MainMenu({ cartItems }: { cartItems: CartItem[] }) {
	return (
		<>
			{/* DESKTOP MENU */}
			<nav className="hidden md:flex md:items-center gap-1">
				{/* MENU CONTENT */}
				<MenuItems cartItemsQty={cartItems.length} />
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
							<MenuItems cartItemsQty={cartItems.length} />
						</div>
					</SheetContent>
				</Sheet>
			</nav>
		</>
	);
}
