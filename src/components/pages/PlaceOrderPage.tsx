// components
import CheckoutSteps from '@/components/shared/CheckoutSteps';

export default function PlaceOrder() {
	return (
		<>
			<CheckoutSteps current={3} />
			<div>PLACE ORDER</div>
		</>
	);
}
