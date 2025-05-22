// lib
import { APP_NAME } from '@/lib/constants'
import { ICONS } from '@/lib/constants/icons'
import { ROUTES } from '@/lib/constants/paths'
// components
import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
	return (
		<div className="flex-start sm:min-w-36">
			<Link href={ROUTES.HOME} className="flex-start">
				<Image
					src={ICONS.LOGO_LIGHT.path}
					alt={ICONS.LOGO_LIGHT.alt}
					width={48}
					height={48}
					priority
					className="dark:hidden" // only visibility in light theme
				/>
				<Image
					src={ICONS.LOGO_DARK.path}
					alt={ICONS.LOGO_DARK.alt}
					width={48}
					height={48}
					priority
					className="hidden dark:block" // only visibility in dark theme
				/>
				<span className="hidden sm:block ml-3 text-2xl font-bold">
					{APP_NAME}
				</span>
			</Link>
		</div>
	)
}

// 'use client'
// // modules
// import { useEffect, useState } from 'react'
// import { useTheme } from 'next-themes'
// // lib
// import { APP_NAME } from '@/lib/constants'
// import { ICONS } from '@/lib/constants/icons'
// import { ROUTES } from '@/lib/constants/paths'
// import { Theme } from '@/lib/constants/enums'
// import { cn } from '@/lib/utils/utils'
// // components
// import Link from 'next/link'
// import Image from 'next/image'

// export default function Logo() {
// 	const { theme, systemTheme } = useTheme()
// 	const [mounted, setMounted] = useState<boolean>(false)

// 	useEffect(() => setMounted(true), [])

// 	const trigger = false

// 	if (trigger) {
// 		if (!mounted) return null

// 		const currentTheme = theme === Theme.SYSTEM ? systemTheme : theme
// 		const logoSrc =
// 			currentTheme === Theme.DARK
// 				? ICONS.LOGO_DARK.path
// 				: ICONS.LOGO_LIGHT.path

// 		return (
// 			<div className="flex-start">
// 				<Link href={ROUTES.HOME} className="flex-start">
// 					<Image
// 						src={logoSrc}
// 						alt={ICONS.LOGO_LIGHT.alt}
// 						width={48}
// 						height={48}
// 						priority
// 					/>
// 					<span className="hidden sm:block ml-3 text-2xl font-bold">
// 						{APP_NAME}
// 					</span>
// 				</Link>
// 			</div>
// 		)
// 	}

// 	if (!trigger) {
// 		if (!mounted) return null

// 		const currentTheme = theme === Theme.SYSTEM ? systemTheme : theme
// 		const logoColor =
// 			currentTheme === Theme.DARK
// 				? "bg-[#ffffff]"
// 				: "bg-[#242424]"

// 		return (
// 			<div className="flex-start">
// 				<Link href={ROUTES.HOME} className="flex-start">
// 					<div className={cn('w-[48px] h-[48px]', logoColor)}></div>
// 					<span className="hidden sm:block ml-3 text-2xl font-bold">
// 						{APP_NAME}
// 					</span>
// 				</Link>
// 			</div>
// 		)
// 	}
// }
