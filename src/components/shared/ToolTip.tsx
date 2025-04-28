// components
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

export default function ToolTip({
	children,
	message,
}: {
	children: React.ReactNode
	message: string
}) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent className='z-[9999]'>
					<p>{message}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
