import { MENU_LABELS } from '@/lib/constants/texts'
import { ROUTES } from '@/lib/constants/paths'

// APP
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'RAM'
export const APP_DESC =
	process.env.NEXT_PUBLIC_APP_DESC || 'RAM. Interpret as you wish.'
export const APP_ROUTE_NAME_HOME = 'Home'

//SERVER
export const SERVER_URL =
	process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// MAIN MENU
export const MENU_ITEMS = [
	{ label: MENU_LABELS.HOME, path: ROUTES.HOME },
	{ label: MENU_LABELS.ABOUT, path: ROUTES.ABOUT },
	{ label: MENU_LABELS.OFFER, path: ROUTES.OFFER },
	{ label: MENU_LABELS.CONTACT, path: ROUTES.CONTACT },
]
