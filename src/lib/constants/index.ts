import { MenuLabels } from "@/lib/constants/texts"
import { Routes } from '@/lib/constants/paths'

// APP
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'RAM'
export const APP_DESC = process.env.NEXT_PUBLIC_APP_DESC || 'RAM. Interpret as you wish.'
export const APP_ROUTE_NAME_HOME = 'Home'

//SERVER
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// MAIN MENU
export const MENU_ITEMS = [
  {label: MenuLabels.HOME, path: Routes.HOME },
  {label: MenuLabels.ABOUT, path: Routes.ABOUT },
  {label: MenuLabels.OFFER, path: Routes.OFFER },
  {label: MenuLabels.CONTACT, path: Routes.CONTACT },
]

