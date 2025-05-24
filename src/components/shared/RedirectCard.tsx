// components
import Logo from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type RedirectCardProps = {
  title: string;
  desc: string;
  redirectPath: string;
  redirectLabel: string;
}

export default function RedirectCard({
  title,
  desc,
  redirectPath,
  redirectLabel,
}: RedirectCardProps) {
  return (
    <div className="flex-center w-screen h-screen">
      <div className='flex flex-col items-center'>
        <Logo />

        <div className="mt-6 p-6 rounded-lg shadow-md text-center">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-[color:var(--gray-dynamic)] text-lg">
            {desc}
          </p>
          <Button variant="outline" className="mt-6" aria-label='Back to Home'>
            <Link href={redirectPath}>{redirectLabel}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
