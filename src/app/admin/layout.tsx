// components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Main from '@/components/layout/Main';
import UserMenu from '@/components/navigations/UserMenu';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header>
				<UserMenu className="mt-1" />
			</Header>
			<Main>{children}</Main>
			<Footer />
		</div>
	);
}
