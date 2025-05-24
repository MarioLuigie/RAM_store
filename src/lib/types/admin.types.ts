import { Order } from '@/lib/types/order.types';

export type SalesData = {
	month: string;
	totalSales: number
}[];

export type Summary = {
  ordersCount: number;
  productsCount: number;
  usersCount: number;
  totalSales: { _sum: { totalPrice: string } };
  latestSales: Order[];
  salesData: SalesData;
}