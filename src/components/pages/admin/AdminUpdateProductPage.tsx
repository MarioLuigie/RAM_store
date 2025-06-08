// components
import AdminProductForm from '@/components/forms/AdminProductForm';
import { ActionTypes } from '@/lib/constants/enums';
import { getProductById } from '@/lib/actions/product.actions';

export default async function AdminUpdateProductPage({
	productId,
}: {
	productId: string;
}) {
	const { data: product } = await getProductById(productId);

	return (
		<>
			<div className="my-8">
				<AdminProductForm
					actionType={ActionTypes.UPDATE}
					productId={productId}
					product={product}
				/>
			</div>
		</>
	);
}
