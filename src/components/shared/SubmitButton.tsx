// modules
import Image from 'next/image'
// lib
import { ICONS } from '@/lib/constants/icons'
// components
import BasicButton from '@/components/shared/BasicButton'

interface SubmitButtonProps {
	isLoading?: boolean
	className?: string
	children: React.ReactNode
	isDanger?: boolean
	variant?: 'outline' | 'fill' | 'text'
}

export default function SubmitButton({
	isLoading=false,
	className,
	children,
	isDanger,
	variant
}: SubmitButtonProps) {
	return (
		<BasicButton
			disabled={isLoading}
			className={className}
			isDanger={isDanger}
			variant={variant}
		>
			{isLoading ? (
				<div className="flex items-center gap-4">
					<Image
						src={ICONS.LOADER.path}
						alt={ICONS.LOADER.alt}
						width={24}
						height={24}
						className="animate-spin"
						priority
					/>
					Loading...
				</div>
			) : (
				<p className='text-[16px]'>{children}</p>
			)}
		</BasicButton>
	)
}