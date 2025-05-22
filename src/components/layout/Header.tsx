// components
import Logo from '@/components/shared/Logo';
import MainMenu from '@/components/navigations/MainMenu';
import { getCart } from '@/lib/actions/cart.actions';

export default async function Header({
	children,
}: {
	children?: React.ReactNode;
}) {
	const cart = await getCart();

	return (
		<header className="w-full border-b">
			<div className="wrapper flex-between">
				<div className='flex items-center gap-10'>
					<Logo />
					{children}
				</div>
				<MainMenu cartItems={cart?.items || []} />
			</div>
		</header>
	);
}
