// lib
import { ROUTES } from '@/lib/constants/paths'
// components
import Logo from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFoundPage() {
	return (
		<div className="flex-center w-screen h-screen">
			<div className='flex flex-col items-center'>
				<Logo />

				<div className="mt-6 p-6 rounded-lg shadow-md text-center">
					<h1 className="text-3xl font-bold mb-4">Not Found</h1>
					<p className="text-[#383638]">
						Could not find requested resource
					</p>
					<Button variant="outline" className="mt-6">
						<Link href={ROUTES.HOME}>Back to Home</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
