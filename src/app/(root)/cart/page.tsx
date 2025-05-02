// modules
import { Metadata } from 'next'
// components
import CartPage from '@/components/pages/CartPage'

export const metadata: Metadata = {
	title: 'Cart',
}

export default function Page() {

  return (
    <CartPage />
  )
}