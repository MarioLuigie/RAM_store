// components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Main from '@/components/layout/Main';
import AdminMenu from '@/components/navigations/AdminMenu';
import AdminSearch from '@/components/content/AdminSearch';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header>
				<AdminMenu className="mt-1" />
				<AdminSearch />
			</Header>
			<Main>{children}</Main>
			<Footer />
		</div>
	);
}
