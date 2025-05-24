import { Metadata } from "next";
import { APP_ROUTE_NAME_UNAUTHORIZED } from '@/lib/constants';
import UnauthorizedPage from "@/components/pages/UnauthorizedPage";

export const metadata: Metadata = {
  title: `${APP_ROUTE_NAME_UNAUTHORIZED}`,
};

export default function Page() {

  return (
    <UnauthorizedPage />
  )
}