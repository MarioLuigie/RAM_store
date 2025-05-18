// lib
import { MENU_LABELS } from '@/lib/constants/texts';
import { ROUTES } from '@/lib/constants/paths';
import { PaymentMethod } from '@/lib/constants/enums';
import { ICONS } from '@/lib/constants/icons';

// COOKIES
export const SESSION_CART_ID = 'ram-session-cart-id';

// APP
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'RAM';
export const APP_DESC =
	process.env.NEXT_PUBLIC_APP_DESC || 'RAM. Interpret as you wish.';
export const APP_ROUTE_NAME_HOME = 'Home';
export const APP_ROUTE_NAME_ORDERS = 'Orders';
export const APP_ROUTE_NAME_CART = 'Cart';
export const APP_ROUTE_NAME_PROFILE = 'Profile';

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 2;

export const LOCALE_CODES = {
	main: 'de-DE',
	usa: 'en-US',
	ger: 'de-DE',
	pol: 'pl-PL',
	fra: 'fr-FR',
	esp: 'es-ES',
	eng: 'en-GB',
};

export const PAYPAL_LOCALE_CODES = {
	main: 'de_DE',
	usa: 'en_US',
	ger: 'de_DE',
	pol: 'pl_PL',
	fra: 'fr_FR',
	esp: 'es_ES',
	eng: 'en_GB',
};
export const CURRENCY_CODES = {
	main: 'EUR',
	usa: 'USD',
	ger: 'EUR',
	pol: 'PLN',
	fra: 'EUR',
	esp: 'EUR',
	eng: 'GBP',
};

//SERVER
export const SERVER_URL =
	process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

// ADDITIONAL MENU ITEMS
export const MENU_ITEMS_ADDITIONAL = [
	{ label: MENU_LABELS.PROFILE, path: ROUTES.PROFILE, iconPath: ICONS.USER.path },
	{ label: MENU_LABELS.ORDERS, path: ROUTES.ORDERS, iconPath: ICONS.ORDERS.path },
];

// PRODUCTS
export const LATEST_PRODUCTS_LIMIT =
	Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

// DEFAULT VALUES FOR SIGNIN FORM
export const SIGNIN_DEFAULT_VALUES = {
	email: '',
	password: '',
};

// DEFAULT VALUES FOR SIGNUP FORM
export const SIGNUP_DEFAULT_VALUES = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
};

// DEFAULT VALUES FOR SIGNUP FORM
export const SHIPPING_ADDRESS_DEFAULT_VALUES = {
	fullName: '',
	streetAddress: '',
	city: '',
	postalCode: '',
	country: '',
};

// DEFAULT ACTION STATE FOR SIGN IN FORM
export const DEFAULT_ACTION_STATE = {
	success: false,
	message: '',
};

// PAYMENT METHODS
export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
	? process.env.PAYMENT_METHODS.split(', ')
	: [
			PaymentMethod.PAYPAL,
			PaymentMethod.STRIPE,
			PaymentMethod.CASH_ON_DELIVERY,
	  ];

export const DEFAULT_PAYMENT_METHOD =
	process.env.DEFAULT_PAYMENT_METHOD || PaymentMethod.PAYPAL;
