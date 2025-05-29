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

type ShowCustomToast = (message: string, success: boolean) => void;

export async function handleGetProductBySlug(
	slug: string
): Promise<IDataResult<Product>> {
	const result = await getProductBySlug(slug);
	return result;
}

export async function handleCreateProduct(
	data: CreateProduct,
	showCustomToast: ShowCustomToast
) {
	const {
		success,
		message,
	} = await createProduct(data);

	if (success) {
		showCustomToast(message, success);
	} else {
		showCustomToast(message, success);
	}
}

export async function handleUpdateProduct(
	data: UpdateProduct,
	showCustomToast: ShowCustomToast
) {
  	const {
		success,
		message,
	} = await updateProduct(data);

	if (success) {
		showCustomToast(message, success);
	} else {
		showCustomToast(message, success);
	}
}
