// modules
import { Metadata } from 'next';
// lib
import { APP_ROUTE_NAME_PROFILE } from '@/lib/constants';
// components
import ProfilePage from "@/components/pages/ProfilePage";

export const metadata: Metadata = {
	title: APP_ROUTE_NAME_PROFILE,
};

export default function Page() {

  return (
    <ProfilePage />
  );
}