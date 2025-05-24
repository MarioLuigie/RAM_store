import { deleteOrder } from "@/lib/actions/order.actions";

export async function handleDeleteOrder(orderId: string) {
  const res = await deleteOrder(orderId);

}