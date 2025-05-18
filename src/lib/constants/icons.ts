// modules
import { ShoppingBag, UserIcon } from 'lucide-react';
// lib
import { ICONS_PATH } from '@/lib/constants/paths';
import { MENU_LABELS } from '@/lib/constants/texts';

export const ICONS = {
	LOGO_LIGHT: {
		path: ICONS_PATH.LOGO_LIGHT,
		alt: 'logo',
	},
	LOGO_DARK: {
		path: ICONS_PATH.LOGO_DARK,
		alt: 'logo',
	},
	LOADER: {
		path: ICONS_PATH.LOADER,
		alt: 'loading...',
	},
	APPLE: {
		path: ICONS_PATH.APPLE,
		alt: 'apple',
	},
	GOOGLE: {
		path: ICONS_PATH.GOOGLE,
		alt: 'google',
	},
	META: {
		path: ICONS_PATH.META,
		alt: 'meta',
	},
	ORDERS: {
		path: ICONS_PATH.ORDERS,
		alt: 'orders',
	},
	USER: {
		path: ICONS_PATH.USER,
		alt: 'user',
	},
};

export const ICON_MAP: Record<string, React.ElementType> = {
  [MENU_LABELS.ORDERS]: ShoppingBag,
  [MENU_LABELS.PROFILE]: UserIcon,
};
