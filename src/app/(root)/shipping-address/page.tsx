// modules
import { Metadata } from 'next'
// components
import ShippingAddressPage from "@/components/pages/ShippingAddressPage"

export const metadata: Metadata = {
	title: 'Shipping Address',
}

export default function Page() {

  return (
    <ShippingAddressPage />
  )
}