'use client'
// modules
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
// components
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { SunIcon, MoonIcon, SunMoon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Theme } from '@/lib/constants/enums'

export default function ModeToggle() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState<boolean>(false)

	useEffect(() => setMounted(true), [])
	if (!mounted) return null

	const handleSetSystemTheme = () => {
		setTheme(Theme.SYSTEM)
	}

	const handleSetDarkTheme = () => {
		setTheme(Theme.DARK)
	}

	const handleSetLightTheme = () => {
		setTheme(Theme.LIGHT)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					{theme === Theme.SYSTEM ? (
						<SunMoon />
					) : theme === Theme.DARK ? (
						<MoonIcon />
					) : (
						<SunIcon />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuCheckboxItem
					checked={theme === Theme.SYSTEM}
					onClick={handleSetSystemTheme}
				>
					System
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={theme === Theme.DARK}
					onClick={handleSetDarkTheme}
				>
					Dark
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={theme === Theme.LIGHT}
					onClick={handleSetLightTheme}
				>
					Light
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
