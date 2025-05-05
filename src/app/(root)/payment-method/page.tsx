// modules
import { Metadata } from 'next';
// components
import PaymentMethodPage from '@/components/pages/PaymentMethodPage';

export const metadata: Metadata = {
	title: 'Payment Method',
};

export default function Page() {
	return <PaymentMethodPage />;
}
