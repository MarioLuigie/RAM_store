import { requireAdmin } from "@/lib/utils/auth-guard";

export default async function AdminProductsPage() {
  await requireAdmin();
  return (
    <div>
      PRODUCTS PAGE
    </div>
  )
}