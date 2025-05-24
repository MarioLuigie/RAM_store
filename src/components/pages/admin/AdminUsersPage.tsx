import { requireAdmin } from "@/lib/utils/auth-guard";

export default async function AdminUsersPage() {
  await requireAdmin();
  return (
    <div>
      USERS PAGE
    </div>
  )
}