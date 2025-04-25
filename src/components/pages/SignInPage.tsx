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
        <CardContent className='space-y-4'>
          <AuthForm />
        </CardContent>
			</Card>
		</div>
	)
}
