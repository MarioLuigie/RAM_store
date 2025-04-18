import Header from '@/components/layout/Header'
import Main from '@/components/layout/Main'
import Footer from '@/components/layout/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className='flex flex-col min-h-screen'>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </div>
}
