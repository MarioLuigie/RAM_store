import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Decimal } from '@prisma/client/runtime/library'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// Convert prisma object into regular JS object
export function convertToPlainObject<T>(value: T): T {
	return JSON.parse(JSON.stringify(value))
}

export function formatNumberWithDecimalToString(number: number | Decimal | string): string {
  const [int, decimal] = number.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}

// Make text shorter
export const truncateText = (text: string | null, end: number = 4) => {
	if (text !== null) {
		return `${text.slice(0, end)}...`
	} else {
		return
	}
}


