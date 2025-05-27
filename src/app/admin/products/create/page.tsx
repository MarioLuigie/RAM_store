import AdminCreateProductPage from '@/components/pages/admin/AdminCreateProductPage';
// modules
import { Metadata } from 'next';
// lib
import { APP_ROUTE_NAME_CREATE_PRODUCT } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Admin ${APP_ROUTE_NAME_CREATE_PRODUCT}`,
};

export default function Page() {
	return <AdminCreateProductPage />;
}
