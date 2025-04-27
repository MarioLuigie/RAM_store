// components
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Logo from '@/components/shared/Logo'

type AuthPadProps = {
  title: string
  desc: string
  children: React.ReactNode
}

export default function AuthPad({
  title,
  desc,
  children
}: AuthPadProps) {
	return (
		<div className="w-full max-w-md mx-auto">
			<Card className="gap-0">
				<CardHeader>
					<div className="flex-center mb-4">
						<Logo />
					</div>
					<CardTitle className="text-center text-xl">{title}</CardTitle>
					<CardDescription className="text-center">
						{desc}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{children}
				</CardContent>
			</Card>

			<div className="mt-8 text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
				By clicking continue, you agree to our{' '}
				<a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	)
}
