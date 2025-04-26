// modules
import clsx from 'clsx'
// components
import { Button } from '@/components/ui/button'

interface BasicButtonProps {
	type?: 'submit' | 'reset' | 'button' | undefined
	className?: string
	children: React.ReactNode
	isDanger?: boolean
	variant?: 'outline' | 'fill' | 'text'
	onClick?: () => void
	disabled?: boolean
}

export default function BasicButton({
	type = 'submit',
	className,
	children,
	isDanger = false,
	variant = 'outline',
	onClick,
	disabled = false,
}: BasicButtonProps) {
	const dangerVariants = {
		outline:
			'text-white px-4 py-2 rounded-md bg-transparent flex-center border border-red-700 min-w-[110px] hover:bg-transparent !important',
		fill: 'text-white px-4 py-2 rounded-md flex-center min-w-[110px] bg-red-700 hover:bg-red-400 !important',
		text: 'text-red-400 hover:text-red-300 bg-transparent hover:bg-transparent !important',
	}

	const primaryVariants = {
		outline:
			'text-white px-4 py-2 rounded-md bg-transparent flex-center border border-green-500 min-w-[110px] hover:bg-transparent !important',
		fill: 'text-white px-4 py-2 rounded-md bg-green-500 flex-center min-w-[110px] hover:bg-green-400 !important',
		text: 'text-green-500 hover:text-green-400 bg-transparent hover:bg-transparent !important',
	}

	return (
		<Button
			disabled={disabled}
			type={type}
			className={clsx(
				isDanger ? dangerVariants[variant] : primaryVariants[variant],
				className
			)}
			onClick={onClick}
		>
			{children}
		</Button>
	)
}