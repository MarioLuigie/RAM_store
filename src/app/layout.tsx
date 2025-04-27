import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { APP_NAME, APP_DESC, SERVER_URL } from '@/lib/constants'
import { ThemeProvider } from 'next-themes'
import { Theme } from '@/lib/constants/enums'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: {
		template: `%s | ${APP_NAME}`,
		default: APP_NAME,
	},
	description: APP_DESC,
	metadataBase: new URL(SERVER_URL),
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pl" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme={Theme.SYSTEM}
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster closeButton />
				</ThemeProvider>
			</body>
		</html>
	)
}
