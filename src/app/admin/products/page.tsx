// modules
import { Metadata } from 'next';// components
import AdminProductsPage from "@/components/pages/admin/AdminProductsPage";
import { APP_ROUTE_NAME_PRODUCTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Admin ${APP_ROUTE_NAME_PRODUCTS}`,
};

export default function Page() {

  return (
    <AdminProductsPage />

  )
}