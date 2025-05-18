// modules
import { Metadata } from 'next'
// components
import CartPage from '@/components/pages/CartPage'
import { APP_ROUTE_NAME_CART} from '@/lib/constants'

export const metadata: Metadata = {
	title: APP_ROUTE_NAME_CART,
}

export default function Page() {

  return (
    <CartPage />
  )
}