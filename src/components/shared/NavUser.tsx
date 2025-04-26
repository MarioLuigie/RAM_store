import LoggedOutUserButton from '@/components/shared/LoggedOutUserButton'
import LoggedInUserButton from './LoggedInUserButton'

export function NavUser() {
	return (
		<>
			<LoggedOutUserButton />
			<LoggedInUserButton
				user={{ name: 'abc', email: 'abc@example.com', avatar: '' }}
			/>
		</>
	)
}
