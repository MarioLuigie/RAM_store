// lib
import { getOrders } from "@/lib/actions/order.actions";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils/utils";
import OrdersTable from "@/components/tables/OrdersTable";

export default async function OrdersPage({
  page
}: {
  page: string
}) {
  const { success, data, message } = await getOrders({
    limit: 2,
    page: Number(page) || 1,
  });

  console.log("ORDERS:", data?.orders)

  return (
    <div>
      <OrdersTable />
    </div>
  )
}