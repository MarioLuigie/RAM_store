'use client'
// modules
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
// lib
import { APP_NAME } from '@/lib/constants'
import { ICONS } from '@/lib/constants/icons'
import { ROUTES } from '@/lib/constants/paths'
// components
import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
	const { theme, systemTheme } = useTheme()
	const [mounted, setMounted] = useState<boolean>(false)

	useEffect(() => setMounted(true), [])
	if (!mounted) return null

	const currentTheme = theme === 'system' ? systemTheme : theme
	const logoSrc =
		currentTheme === 'dark' ? ICONS.LOGO_DARK.path : ICONS.LOGO_LIGHT.path

	return (
		<div className="flex-start">
			<Link href={ROUTES.HOME} className="flex-start">
				<Image
					src={logoSrc}
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
