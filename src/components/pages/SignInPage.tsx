// modules
import Link from 'next/link'
// lib
import { AuthTypes } from '@/lib/constants/enums'
import { ROUTES } from '@/lib/constants/paths'
// components
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Logo from '@/components/shared/Logo'
import AuthForm from '@/components/forms/AuthForm'

export default function SignInPage() {
	console.log(AuthTypes.SIGN_IN)

	return (
		<div className="w-full max-w-md mx-auto">
			<Card>
				<CardHeader className="space-y-4">
					<Link href={ROUTES.HOME} className="flex-center">
						<Logo />
					</Link>
					<CardTitle className="text-center">Sign In</CardTitle>
					<CardDescription className="text-center">
						Sign in to your account
					</CardDescription>
				</CardHeader>
        <CardContent className='space-y-4'>
          <AuthForm />
        </CardContent>
			</Card>
		</div>
	)
}
