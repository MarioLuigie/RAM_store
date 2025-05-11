// components
import Logo from '@/components/shared/Logo';
import Menu from '@/components/shared/Menu';
import { getCart } from '@/lib/actions/cart.actions';

export default async function Header() {
	const cart = await getCart();

	return (
		<header className="w-full border-b">
			<div className="wrapper flex-between">
				<Logo />
				<Menu cartItems={cart?.items || []} />
			</div>
		</header>
	);
}
