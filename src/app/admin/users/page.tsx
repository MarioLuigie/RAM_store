// modules
import { Metadata } from 'next';
// components
import AdminUsersPage from "@/components/pages/admin/AdminUsersPage";
import { APP_ROUTE_NAME_USERS } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${APP_ROUTE_NAME_USERS}`,
};

export default function Page() {

  return (
    <AdminUsersPage />
  )
}