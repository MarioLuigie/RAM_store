import { z } from 'zod';
import { AddProductSchema, ProductSchema, UpdateProductSchema } from '@/lib/utils/validators';

// TYPE FOR PRODUCT IN APP
export type Product = z.infer<typeof ProductSchema> & {
	id: string;
	createdAt: Date;
};

export type AddProduct = z.infer<typeof AddProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;

export type Prices = {
	itemsPrice: string;
	shippingPrice: string;
	taxPrice: string;
	totalPrice: string;
};
