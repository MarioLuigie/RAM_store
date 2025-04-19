//lib
import { APP_NAME } from '@/lib/constants'
import { ICONS } from '@/lib/constants/icons'
import { ROUTES } from '@/lib/constants/paths'
// components
import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {

  return (
    <div className="flex-start">
    <Link href={ROUTES.HOME} className="flex-start">
      <Image
        src={ICONS.LOGO_LIGHT.path}
        alt={ICONS.LOGO_LIGHT.alt}
        width={48}
        height={48}
        priority
      />
      <span className="hidden sm:block ml-3 text-2xl font-bold">
        {APP_NAME}
      </span>
    </Link>
  </div>
  )
}