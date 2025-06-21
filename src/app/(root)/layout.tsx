import Header from '@/components/layout/Header';
import Main from '@/components/layout/Main';
import Footer from '@/components/layout/Footer';
import Search from '@/components/content/Search';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header>
				<Search />
			</Header>
			<Main>{children}</Main>
			<Footer />
		</div>
	);
}
