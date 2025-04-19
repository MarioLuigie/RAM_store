// components
import Logo from '@/components/shared/Logo'
import Menu from '@/components/shared/Menu'

export default function Header() {
	return (
		<header className="w-full border-b">
			<div className="wrapper flex-between">
				<Logo />
				<Menu />
			</div>
		</header>
	)
}
