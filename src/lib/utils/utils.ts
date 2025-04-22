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


