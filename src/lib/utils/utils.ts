import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Decimal } from '@prisma/client/runtime/library';
import { CartItem } from '../types/cart.types';
import { Prices } from '../types/products.types';

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

const CURRENCY_FORMATTER = new Intl.NumberFormat('de-DE', {
	currency: 'EUR',
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
	locale = 'de-DE',
	currencyCode = 'EUR'
) {
	const number = typeof amount === 'number' ? amount : Number(amount)

	const formatter = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: currencyCode,
	})

	const parts = formatter.formatToParts(number)

	const currency = parts.find(p => p.type === 'currency')?.value || ''
	const integer = parts.find(p => p.type === 'integer')?.value || '0'
	const fraction = parts.find(p => p.type === 'fraction')?.value || ''
	const literal = parts.find(p => p.type === 'decimal')?.value || ''
	const symbolFirst =
		parts.findIndex(p => p.type === 'currency') <
		parts.findIndex(p => p.type === 'integer')

	return { currency, integer, fraction, symbolFirst, literal }
}

