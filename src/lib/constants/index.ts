// lib
import { MENU_LABELS } from '@/lib/constants/texts';
import { ROUTES } from '@/lib/constants/paths';

// COOKIES
export const SESSION_CART_ID = 'ram-session-cart-id';

// APP
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'RAM';
export const APP_DESC =
	process.env.NEXT_PUBLIC_APP_DESC || 'RAM. Interpret as you wish.';
export const APP_ROUTE_NAME_HOME = 'Home';
export const LOCALE_CODES = {
	usa: 'en-US',
	ger: 'de-DE',
	pol: 'pl-PL',
	fra: 'fr-FR',
	esp: 'es-ES',
	eng: 'en-GB',
}
export const CURRENCY_CODES = {
	usa: 'USD',
	ger: 'EUR',
	pol: 'PLN',
	fra: 'EUR',
	esp: 'EUR',
	eng: 'GBP',
}

//SERVER
export const SERVER_URL =
	process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

// MAIN MENU ITEMS
export const MENU_ITEMS = [{ label: MENU_LABELS.HOME, path: ROUTES.HOME }];

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
	: ['PayPal', 'Stripe', 'CashOnDelivery'];

export const DEFAULT_PAYMENT_METHOD =
	process.env.DEFAULT_PAYMENT_METHOD || 'PayPal';
