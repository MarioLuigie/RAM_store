import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Decimal } from '@prisma/client/runtime/library';
import { CartItem } from '../types/cart.types';
import { Prices } from '../types/products.types';
import { LOCALE_CODES, CURRENCY_CODES } from '../constants';
import qs from 'query-string';

// Build the pagination links
export function buildUrlQuery({
	params,
	key,
	value,
}: {
	params: string;
	key: string;
	value: string | null;
}) {
	const query = qs.parse(params);
	query[key] = value;

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query,
		},
		{
			skipNull: true,
		}
	);
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Convert prisma object into regular JS object
export function convertToPlainObject<T>(value: T): T {
	return JSON.parse(JSON.stringify(value));
}

export function formatNumberWithDecimalToString(
	number: number | Decimal | string
): string {
	const [int, decimal] = number.toString().split('.');
	return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}

// Make text shorter
export const truncateText = (text: string | null, end: number = 4) => {
	if (text !== null) {
		return `${text.slice(0, end)}...`;
	} else {
		return;
	}
};

// Round number to two decimal places
export function round2(value: number | string) {
	if (typeof value === 'number') {
		return Math.round((value + Number.EPSILON) * 100) / 100;
	} else if (typeof value === 'string') {
		return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
	} else {
		throw new Error('Value is not a number or string');
	}
}

// Calculate price
export function calcPrices(items: CartItem[]) {
	const itemsPrice: number = round2(
		items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
	);

	const shippingPrice: number = round2(itemsPrice > 100 ? 0 : 10);
	const taxPrice: number = round2(itemsPrice * 0.21);
	const totalPrice: number = round2(itemsPrice + shippingPrice + taxPrice);

	const prices: Prices = {
		itemsPrice: itemsPrice.toFixed(2),
		shippingPrice: shippingPrice.toFixed(2),
		taxPrice: taxPrice.toFixed(2),
		totalPrice: totalPrice.toFixed(2),
	};

	return prices;
}

const CURRENCY_FORMATTER = new Intl.NumberFormat(LOCALE_CODES.main, {
	currency: CURRENCY_CODES.main,
	style: 'currency',
	minimumFractionDigits: 2,
});

// Format currency using the formatter above and return currency
export function formatCurrency(amount: number | string | null) {
	if (typeof amount === 'number') {
		return CURRENCY_FORMATTER.format(amount); // returned always string
	} else if (typeof amount === 'string') {
		return CURRENCY_FORMATTER.format(Number(amount)); // returned always string
	} else {
		return 'NaN';
	}
}

// Format currency using the formatter and return currency parts e.x for styling items
export function formatCurrencyParts(
	amount: number | string,
	locale = LOCALE_CODES.main,
	currencyCode = CURRENCY_CODES.main
) {
	const number = typeof amount === 'number' ? amount : Number(amount);

	const formatter = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: currencyCode,
	});

	const parts = formatter.formatToParts(number);

	const currency = parts.find((p) => p.type === 'currency')?.value || '';
	const integer = parts.find((p) => p.type === 'integer')?.value || '0';
	const fraction = parts.find((p) => p.type === 'fraction')?.value || '';
	const literal = parts.find((p) => p.type === 'decimal')?.value || '';
	const symbolFirst =
		parts.findIndex((p) => p.type === 'currency') <
		parts.findIndex((p) => p.type === 'integer');

	return { currency, integer, fraction, symbolFirst, literal };
}

// SHORTEN UUID
export function formatId(id: string) {
	return `...${id.substring(id.length - 6)}`;
}

// FORMAT DATE AND TIMES
export const formatDateTime = (dateString: Date) => {
	const dateTimeOptions: Intl.DateTimeFormatOptions = {
		month: 'short', // abbreviated month name (e.g., 'Oct')
		year: 'numeric', // abbreviated year name (e.g., '25')
		day: 'numeric', // numeric day of the month (e.g., '25')
		hour: 'numeric', // numeric hour (e.g., '8')
		minute: 'numeric', // numeric minute (e.g., '30')
		hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
	};
	const dateOptions: Intl.DateTimeFormatOptions = {
		weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
		month: 'short', // abbreviated month name (e.g., 'Oct')
		year: 'numeric', // numeric year (e.g., '2023')
		day: 'numeric', // numeric day of the month (e.g., '25')
	};
	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: 'numeric', // numeric hour (e.g., '8')
		minute: 'numeric', // numeric minute (e.g., '30')
		hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
	};
	const formattedDateTime: string = new Date(dateString).toLocaleString(
		LOCALE_CODES.main,
		dateTimeOptions
	);
	const formattedDate: string = new Date(dateString).toLocaleString(
		LOCALE_CODES.main,
		dateOptions
	);
	const formattedTime: string = new Date(dateString).toLocaleString(
		LOCALE_CODES.main,
		timeOptions
	);
	return {
		dateTime: formattedDateTime,
		dateOnly: formattedDate,
		timeOnly: formattedTime,
	};
};
