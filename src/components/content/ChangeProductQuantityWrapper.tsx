// lib
import { getProductBySlug } from "@/lib/actions/product.actions";
import { CartItem } from "@/lib/types/cart.types";
// components
import { ChangeProductQuantity } from "@/components/content/ChangeProductQuantity";

export async function ChangeProductQuantityWrapper({
  item,
}: {
  item: CartItem
}) {
  const { data: product } = await getProductBySlug(item.slug);

  return (
    <ChangeProductQuantity
    productStock={product.stock}
    item={item}
    quantity={item.qty}
  />
  )
}