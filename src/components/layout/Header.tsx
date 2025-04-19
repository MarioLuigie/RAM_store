// modules
import { ShoppingCart, UserIcon } from 'lucide-react'
//lib
import { APP_NAME } from '@/lib/constants'
import { ICONS } from '@/lib/constants/icons'
import { ROUTES } from '@/lib/constants/paths'
// components
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
// import { Button } from '@/components/ui/button'

export default function Header() {
	return (
		<header className="w-full border-b">
			<div className="wrapper flex-between">
				{/* LOGO */}
				<div className="flex-start">
					<Link href={ROUTES.HOME} className="flex-start">
						<Image
							src={ICONS.LOGO.path}
							alt={ICONS.LOGO.alt}
							width={48}
							height={48}
							priority
						/>
						<span className="hidden sm:block ml-3 text-2xl font-bold">
							{APP_NAME}
						</span>
					</Link>
				</div>

        {/* BUTTONS */}
				<div>
					{/* CART BUTTON */}
					<Button asChild variant="ghost">
						<Link href={ROUTES.CART}>
							<ShoppingCart /> Cart
						</Link>
					</Button>

					{/* LOGIN BUTTON */}
					<Button asChild variant="ghost">
						<Link href={ROUTES.SIGN_IN}>
							<UserIcon /> Sign In
						</Link>
					</Button>
				</div>
			</div>
		</header>
	)
}
