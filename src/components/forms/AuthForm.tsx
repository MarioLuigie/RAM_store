'use client'
// modules
import Link from 'next/link'
// lib
import { SIGNIN_DEFAULT_VALUES } from '@/lib/constants'
import { ROUTES } from '@/lib/constants/paths'
import { ICONS } from '@/lib/constants/icons'
// components
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import SubmitButton from '@/components/shared/SubmitButton'
import SVG from '@/components/shared/SVG'

export default function AuthForm() {
	return (
		<form className="p-6 md:p-8">
			{/* FORM FIELDS */}
			<div className="space-y-6">
				{/* EMAIL INPUT */}
				<div className="grid gap-2">
					<Label htmlFor="email">E-mail</Label>
					<Input
						id="email"
						name="email"
						type="email"
						required
						autoComplete="email"
						defaultValue={SIGNIN_DEFAULT_VALUES.email}
					/>
				</div>

				{/* PASSWORD INPUT */}
				<div className="grid gap-2">
					<div className="flex items-center">
						<Label htmlFor="password">Password</Label>
						<Link
							href="#"
							className="ml-auto text-sm underline-offset-2 hover:underline"
						>
							Forgot your password?
						</Link>
					</div>
					<Input
						id="password"
						name="password"
						type="password"
						required
						autoComplete="password"
						defaultValue={SIGNIN_DEFAULT_VALUES.password}
					/>
				</div>

        {/* SUBMIT BUTTON */}
        <div>
          <SubmitButton className='w-full bg-black outline-0 hover:bg-[#383638] cursor-pointer' variant='fill'>Login</SubmitButton>
        </div>

				{/* SEPERATOR LINE */}
				<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
					<span className="relative z-10 bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>

				{/* PROVIDERS */}
				<div className="grid grid-cols-3 gap-4">
					<Button variant="outline" className="w-full">
						<SVG src={ICONS.APPLE.path} />
						<span className="sr-only">Login with Apple</span>
					</Button>
					<Button variant="outline" className="w-full">
						<SVG src={ICONS.GOOGLE.path} />
						<span className="sr-only">Login with Google</span>
					</Button>
					<Button variant="outline" className="w-full">
						<SVG src={ICONS.META.path} />
						<span className="sr-only">Login with Meta</span>
					</Button>
				</div>
				{/* REDIRECT TO SIGN UP ROUTE */}
				<div className="text-center text-sm">
					Don&apos;t have an account?{' '}
					<Link
						href={ROUTES.SIGN_UP}
						className="underline underline-offset-4"
					>
						Sign up
					</Link>
				</div>
			</div>
		</form>
	)
}
