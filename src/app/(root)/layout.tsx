import Header from '@/components/layout/Header';
import Main from '@/components/layout/Main';
import Footer from '@/components/layout/Footer';
import SearchProduct from '@/components/content/SearchProduct';
import CategoryDrawer from '@/components/navigations/CategoryDrawer';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header>
				<CategoryDrawer />
				<SearchProduct />
			</Header>
			<Main>{children}</Main>
			<Footer />
		</div>
	);
}
