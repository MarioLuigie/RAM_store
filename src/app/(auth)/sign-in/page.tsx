// modules
import { Metadata } from "next"
// components
import SignInPage from "@/components/pages/SignInPage"

export const metadata: Metadata = {
  title: 'Sign in', 
}

export default function Page() {

  return (
    <SignInPage />
  )
}