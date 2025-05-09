'use client';

export default function PaymentMethodForm({
	preferredPaymentMethod,
}: {
	preferredPaymentMethod: string | null;
}) {
	return <div>PAYMENT METHOD FORM, {preferredPaymentMethod}</div>;
}
