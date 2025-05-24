// lib
import { USER_MENU_LABELS, ADMIN_MENU_LABELS } from '@/lib/constants/texts';
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
export const APP_ROUTE_NAME_PRODUCTS = 'Products';
export const APP_ROUTE_NAME_USERS = 'Users';
export const APP_ROUTE_NAME_OVERVIEW = 'Admin Dashboard';
export const APP_ROUTE_NAME_UNAUTHORIZED = 'Unauthorized';

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 6;

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

// USER MENU ITEMS
export const USER_MENU_ITEMS = [
	{ label: USER_MENU_LABELS.PROFILE, path: ROUTES.USER_PROFILE, iconPath: ICONS.USER.path },
	{ label: USER_MENU_LABELS.ORDERS, path: ROUTES.USER_ORDERS, iconPath: ICONS.ORDERS.path },
];

// ADMIN MENU ITEMS
export const ADMIN_MENU_ITEMS = [
	{ label: ADMIN_MENU_LABELS.OVERVIEW, path: ROUTES.ADMIN_OVERVIEW, iconPath: ICONS.USER.path },
	{ label: ADMIN_MENU_LABELS.USERS, path: ROUTES.ADMIN_USERS, iconPath: ICONS.ORDERS.path },
	{ label: ADMIN_MENU_LABELS.PRODUCTS, path: ROUTES.ADMIN_PRODUCTS, iconPath: ICONS.ORDERS.path },
	{ label: ADMIN_MENU_LABELS.ORDERS, path: ROUTES.ADMIN_ORDERS, iconPath: ICONS.ORDERS.path },
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

export const USER_WHITE_LIST = process.env.USER_WHITE_LIST?.split(',') ?? [];

