import { requireAdmin } from "@/lib/utils/auth-guard";
import { getAllOrders } from "@/lib/actions/order.actions";

export default async function AdminOrdersPage({
  page = '1'
}: {
  page: string
}) {
  await requireAdmin();

  const { success, data, message } = await getAllOrders({limit: 2, page: Number(page)});

  return (
    <div>
      ORDERS PAGE
    </div>
  )
}