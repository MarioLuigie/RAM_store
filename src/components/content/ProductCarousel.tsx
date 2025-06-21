// lib
import { getFeaturedProducts } from '@/lib/actions/product.actions';
// components
import CustomCarousel from '@/components/shared/CustomCarousel';

export default async function ProductCarousel() {
	const { success, data: featuredProducts } = await getFeaturedProducts();

	if (!success || !featuredProducts)
		throw new Error('Featured products not found');

	console.log('SUCCESS:', success);
	console.log('FEATURED PRODUCTS:', featuredProducts);

	const preparedBannerItems = featuredProducts?.map(
		(product) => product.banner[0]
	);

	console.log('BANNER ITEMS:', preparedBannerItems);

	return (
		<div className="w-full flex-center mt-8">
			<CustomCarousel data={preparedBannerItems} />
		</div>
	);
}
