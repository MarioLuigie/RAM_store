// modules
import { Metadata } from "next"
// component
import SignOutPage from "@/components/pages/SignOutPage"

export const metadata: Metadata = {
  title: 'Sign out', 
}

export default function Page() {

  return (
    <SignOutPage />
  )
}