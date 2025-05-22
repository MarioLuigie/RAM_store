// modules
import { Metadata } from 'next';
// components
import AdminOverviewPage from "@/components/pages/admin/AdminOverviewPage";
import { APP_ROUTE_NAME_OVERVIEW } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${APP_ROUTE_NAME_OVERVIEW}`,
};

export default function Page() {

  return (
    <AdminOverviewPage />
  )
}