import { requireAdmin } from "@/lib/utils/auth-guard";

export default async function AdminOrdersPage() {
  await requireAdmin();
  return (
    <div>
      ORDERS PAGE
    </div>
  )
}