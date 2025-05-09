// modules
import { Metadata } from "next";
// components
import PlaceOrderPage from "@/components/pages/PlaceOrderPage";

export const metadata: Metadata = {
	title: 'Place Order',
};

export default function Page() {

  return (
    <PlaceOrderPage />
  )
}