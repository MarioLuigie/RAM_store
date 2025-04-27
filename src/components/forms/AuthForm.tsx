'use client'
// modules
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
// lib
import { SIGNIN_DEFAULT_VALUES, SIGNUP_DEFAULT_VALUES } from '@/lib/constants'
import { ROUTES } from '@/lib/constants/paths'
import { ICONS } from '@/lib/constants/icons'
import { DEFAULT_ACTION_STATE } from '@/lib/constants'
import {
	signInUserWithCredentials,
	signUpUserWithCredentials,
} from '@/lib/actions/user.actions'
import { AuthTypes } from '@/lib/constants/enums'
// components
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import SubmitButton from '@/components/shared/SubmitButton'
import SVG from '@/components/shared/SVG'

export default function AuthForm({ type }: { type: AuthTypes }) {
	const actionFn =
		type === AuthTypes.SIGN_IN
			? signInUserWithCredentials
			: signUpUserWithCredentials

	const [data, action] = useActionState(actionFn, DEFAULT_ACTION_STATE)
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || ROUTES.HOME

	function StatusWrapper({
		children,
	}: {
		children: (pending: boolean) => React.ReactNode
	}) {
		const { pending } = useFormStatus()
		return <>{children(pending)}</>
	}

	// SIGN IN
	if (type === AuthTypes.SIGN_IN) {
		return (
			<form action={action} className="p-6 md:p-8">
				<input type="hidden" name="callbackUrl" value={callbackUrl} />
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
						<StatusWrapper>
							{(pending) => (
								<SubmitButton
									className="w-full bg-black outline-0 hover:bg-[#383638] cursor-pointer"
									variant="fill"
									isLoading={pending}
								>
									Sign In
								</SubmitButton>
							)}
						</StatusWrapper>
					</div>
				</div>

				{/* ERROR MESSAGE OPTIONAL */}
				<div className="h-6 my-2">
					<p className="text-destructive text-center">
						{data && !data.success && data.message}
					</p>
				</div>

				{/* PROVIDERS */}
				<div className="space-y-6">
					{/* SEPERATOR LINE */}
					<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
						<span className="relative z-10 bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>

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
				</div>

				{/* REDIRECT TO SIGN UP ROUTE */}
				<div className="text-center text-sm mt-6">
					Don&apos;t have an account?{' '}
					<Link
						href={ROUTES.SIGN_UP}
						className="underline underline-offset-4"
						target="_self"
					>
						Sign up
					</Link>
				</div>
			</form>
		)
	}

	// SIGN UP
	if (type === AuthTypes.SIGN_UP) {
		return (
			<form action={action} className="p-6 md:p-8">
				<input type="hidden" name="callbackUrl" value={callbackUrl} />
				{/* FORM FIELDS */}
				<div className="space-y-6">
					{/* NAME INPUT */}
					<div className="grid gap-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							type="text"
							required
							autoComplete="name"
							defaultValue={SIGNUP_DEFAULT_VALUES.name}
						/>
					</div>

					{/* EMAIL INPUT */}
					<div className="grid gap-2">
						<Label htmlFor="email">E-mail</Label>
						<Input
							id="email"
							name="email"
							type="email"
							required
							autoComplete="email"
							defaultValue={SIGNUP_DEFAULT_VALUES.email}
						/>
					</div>

					{/* PASSWORD INPUT */}
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
						</div>
						<Input
							id="password"
							name="password"
							type="password"
							required
							autoComplete="password"
							defaultValue={SIGNUP_DEFAULT_VALUES.password}
						/>
					</div>

					{/* CONFIRM PASSWORD INPUT */}
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="confirmPassword">Confirm Password</Label>
						</div>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							required
							autoComplete="confirmPassword"
							defaultValue={SIGNUP_DEFAULT_VALUES.confirmPassword}
						/>
					</div>

					{/* SUBMIT BUTTON */}
					<div>
						<StatusWrapper>
							{(pending) => (
								<SubmitButton
									className="w-full bg-black outline-0 hover:bg-[#383638] cursor-pointer"
									variant="fill"
									isLoading={pending}
								>
									Sign Up
								</SubmitButton>
							)}
						</StatusWrapper>
					</div>
				</div>

				{/* ERROR MESSAGE OPTIONAL */}
				<div className="h-6 my-2">
					<p className="text-destructive text-center">
						{data && !data.success && data.message}
					</p>
				</div>

				{/* PROVIDERS */}
				<div className="space-y-6">
					{/* SEPERATOR LINE */}
					<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
						<span className="relative z-10 bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>

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
				</div>

				{/* REDIRECT TO SIGN IN ROUTE */}
				<div className="text-center text-sm mt-6">
					Already have an account?{' '}
					<Link
						href={ROUTES.SIGN_IN}
						className="underline underline-offset-4"
						target="_self"
					>
						Sign in
					</Link>
				</div>
			</form>
		)
	}
}
