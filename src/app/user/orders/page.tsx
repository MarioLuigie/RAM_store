import { Metadata } from 'next'
import { APP_ROUTE_NAME_ORDERS } from '@/lib/constants'

export const metadata: Metadata = {
	title: APP_ROUTE_NAME_ORDERS,
}

export default function Page() {

  return (
    <div>
      ORDERS
    </div>
  )
}