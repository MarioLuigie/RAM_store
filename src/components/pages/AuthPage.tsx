//modules
import { redirect } from 'next/navigation'
// lib
import { auth } from '@/config/auth'
import { ROUTES } from '@/lib/constants/paths'
import { AuthTypes } from '@/lib/constants/enums'
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

export default async function AuthPage({
	callbackUrl,
}: {
	callbackUrl: string
	type: AuthTypes
}) {
	const session = await auth()

	// callbackUrl - only for redirecting from providers site to app
	if (session) {
		redirect(callbackUrl || ROUTES.HOME)
	}

	return (
		<div className="w-full max-w-md mx-auto">
			<Card className="gap-0">
				<CardHeader>
					<div className="flex-center mb-4">
						<Logo />
					</div>
					<CardTitle className="text-center text-xl">Sign In</CardTitle>
					<CardDescription className="text-center">
						Sign in to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
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
