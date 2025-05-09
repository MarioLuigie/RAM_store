// modules
import { Metadata } from "next";
// components
import PlaceOrder from "@/components/pages/PlaceOrder";

export const metadata: Metadata = {
	title: 'Place Order',
};

export default function Page() {

  return (
    <PlaceOrder />
  )
}