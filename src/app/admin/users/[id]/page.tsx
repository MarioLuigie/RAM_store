// modules
import { Metadata } from 'next';
// components
import AdminUserPage from "@/components/pages/admin/AdminUserPage";
import { APP_ROUTE_NAME_UPDATE_USER } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Admin ${APP_ROUTE_NAME_UPDATE_USER}`,
};

export default async function Page({
  params
}: {
  params: Promise<{id: string}>
}) {

  const { id } = await params;

  return (
    <div>
      <AdminUserPage userId={id} />
    </div>
  )
}