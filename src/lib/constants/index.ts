// lib
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

// MAIN MENU ITEMS
export const MENU_ITEMS = [
	{ label: MENU_LABELS.HOME, path: ROUTES.HOME },
]

// PRODUCTS
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4

// DEFAULT VALUES FOR SIGNIN FORM
export const SIGNIN_DEFAULT_VALUES = {
	email: '',
	password: '',
}

// DEFAULT ACTION STATE FOR SIGN IN FORM
export const DEFAULT_ACTION_STATE = {
	success: false,
	message: '',
}