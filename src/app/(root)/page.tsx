// lib
import { APP_ROUTE_NAME_HOME } from '@/lib/constants'
import HomePage from '@/components/pages/HomePage'

export const metadata = {
	title: APP_ROUTE_NAME_HOME,
}

export default function Page() {
	return <HomePage />
}
