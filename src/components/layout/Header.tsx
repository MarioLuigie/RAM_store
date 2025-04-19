// modules
import { ShoppingCart, UserIcon } from 'lucide-react'
//lib
import { ROUTES } from '@/lib/constants/paths'
// components
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Logo from '@/components/shared/Logo'

export default function Header() {
	return (
		<header className="w-full border-b">
			<div className="wrapper flex-between">
				{/* LOGO */}
        <Logo />

        {/* BUTTONS */}
				<div className='flex gap-3'>
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
			</div>
		</header>
	)
}
