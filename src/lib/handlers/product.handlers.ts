import {
	getProductBySlug,
	createProduct,
	updateProduct,
} from '@/lib/actions/product.actions';
import {
	CreateProduct,
	Product,
	UpdateProduct,
} from '@/lib/types/products.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ROUTES } from '../constants/paths';

type ShowCustomToast = (message: string, success: boolean) => void;

export async function handleGetProductBySlug(
	slug: string
): Promise<IDataResult<Product>> {
	const result = await getProductBySlug(slug);
	return result;
}

export async function handleCreateProduct(
	data: CreateProduct,
	showCustomToast: ShowCustomToast,
	router: AppRouterInstance
) {
	const { success, message } = await createProduct(data);

	if (success) {
		showCustomToast(message, success);
		router.push(ROUTES.ADMIN_PRODUCTS);
	} else {
		showCustomToast(message, success);
	}
}

export async function handleUpdateProduct(
	productId: string | null | undefined,
	data: UpdateProduct,
	showCustomToast: ShowCustomToast,
	router: AppRouterInstance
) {
	if (!productId) {
		router.push(ROUTES.ADMIN_PRODUCTS);
		return;
	}

	const { success, message } = await updateProduct({ ...data, id: productId });

	if (success) {
		showCustomToast(message, success);
		router.push(ROUTES.ADMIN_PRODUCTS);
	} else {
		showCustomToast(message, success);
	}
}
