// modules
import { ShoppingCart, UserIcon } from 'lucide-react'
//lib
import { APP_NAME, MENU_ITEMS } from '@/lib/constants'
import { ROUTES } from '@/lib/constantS/paths'
// components
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {

  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href={ROUTES.HOME} className='flex flex-start'></Link>
        </div>
      </div>
    </header>
  )
}