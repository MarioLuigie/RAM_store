'use client'
// lib
import { SIGNIN_DEFAULT_VALUES } from '@/lib/constants'
// components
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AuthForm() {
	return (
		<form className="bg-yellow-100">
			<div className="space-y-6">
				{/* EMAIL INPUT */}
				<div>
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
				<div>
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						required
						autoComplete="password"
						defaultValue={SIGNIN_DEFAULT_VALUES.password}
					/>
				</div>
			</div>
		</form>
	)
}
