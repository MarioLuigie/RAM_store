import { Metadata } from "next";
import { APP_ROUTE_NAME_UNAUTHORIZED_ACCESS } from '@/lib/constants';
import UnauthorizedAccessPage from "@/components/pages/UnauthorizedAccessPage";

export const metadata: Metadata = {
  title: `${APP_ROUTE_NAME_UNAUTHORIZED_ACCESS}`,
};

export default function Page() {

  return (
    <UnauthorizedAccessPage />
  )
}