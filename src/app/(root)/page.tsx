// lib
import { APP_ROUTE_NAME_HOME } from '@/lib/constants'
import HomePage from '@/components/pages/HomePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: APP_ROUTE_NAME_HOME,
}

export default function Page() {
	return <HomePage />
}
