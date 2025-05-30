import { z } from 'zod';
import { CreateProductSchema, ProductSchema, UpdateProductSchema, ProductImageSchema } from '@/lib/utils/validators';

// TYPE FOR PRODUCT IN APP
export type Product = z.infer<typeof ProductSchema> & {
	id: string;
	createdAt: Date;
};

export type ProductImage = z.infer<typeof ProductImageSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;

export type Prices = {
	itemsPrice: string;
	shippingPrice: string;
	taxPrice: string;
	totalPrice: string;
};
