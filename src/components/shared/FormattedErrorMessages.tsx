// modules
import { Ban } from 'lucide-react'

export default function FormattedErrorMessages({
	message,
}: {
	message: string
}) {
	return (
		<div className="text-destructive text-start text-xs">
			{message &&
				message.split('.').map((msg, i) => (
					<div className="flex items-center gap-2" key={i}>
						<Ban className="w-3" />
						<p>{msg}</p>
					</div>
				))}
		</div>
	)
}
