// lib
import { formatCurrency } from '@/lib/utils/utils';
// components
import StyledPrice from '@/components/content/StyledPrice';

type OrderPricesProps = {
	itemsPrice: string;
	shippingPrice: string;
	taxPrice: string;
	totalPrice: string;
};

export default function OrderPrices({
	itemsPrice,
	shippingPrice,
	taxPrice,
	totalPrice,
}: OrderPricesProps) {
	return (
		<>
			<div className="space-y-2 text-muted-foreground">
				<div className="flex justify-between ">
					<p>Products Price</p>
					<p>{formatCurrency(itemsPrice)}</p>
				</div>

				<div className="flex justify-between ">
					<p>Tax Price</p>
					<p>{formatCurrency(taxPrice)}</p>
				</div>

				<div className="flex justify-between ">
					<p>Shipping Price</p>
					<p>{formatCurrency(shippingPrice)}</p>
				</div>
			</div>

			<div className="flex justify-between ">
				<p className="text-xl">Total Price</p>
				<StyledPrice price={totalPrice} />
			</div>
		</>
	);
}
