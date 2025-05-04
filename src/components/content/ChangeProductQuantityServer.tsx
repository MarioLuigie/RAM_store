// lib
import { getProductBySlug } from "@/lib/actions/product.actions";
import { CartItem } from "@/lib/types/cart.types";
// components
import { ChangeProductQuantity } from "@/components/content/ChangeProductQuantity";
import { Product } from "@/lib/types/products.types";

export async function ChangeProductQuantityServer({
  item,
}: {
  item: CartItem
}) {
  const { data: product }: IDataResult<Product> = await getProductBySlug(item.slug);

  if (!product) {
    return <div>Product data not found</div>;
  }

  return (
    <ChangeProductQuantity
    productStock={product.stock}
    item={item}
    quantity={item.qty}
  />
  )
}