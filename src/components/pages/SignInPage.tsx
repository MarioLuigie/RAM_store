//modules
import { redirect } from 'next/navigation'
// lib
import { auth } from '@/config/auth'
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

export default async function SignInPage() {
	const session = await auth()

	if(session) {
		redirect(ROUTES.HOME)
	}

	return (
		<div className="w-full max-w-md mx-auto">
			<Card>
				<CardHeader className="space-y-4">
					<div className="flex-center">
						<Logo />
					</div>
					<CardTitle className="text-center">Sign In</CardTitle>
					<CardDescription className="text-center">
						Sign in to your account
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<AuthForm />
				</CardContent>
			</Card>

			<div className="mt-8 text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
				By clicking continue, you agree to our{' '}
				<a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	)
}
