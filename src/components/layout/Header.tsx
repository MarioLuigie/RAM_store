// components
import Logo from '@/components/shared/Logo';
import Menu from '@/components/shared/Menu';
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
				<Menu cartItems={cart?.items || []} />
			</div>
		</header>
	);
}
