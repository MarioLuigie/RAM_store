import { getFeaturedProducts } from "@/lib/actions/product.actions"

export default async function ProductCarousel() {
  const { success, data: featuredProducts } = await getFeaturedProducts();

  console.log("SUCCESS:", success)
  console.log("FEATURED PRODUCTS:", featuredProducts)

  return (
    <div className="bg-red-300 w-full flex-center">
      PRODUCT CAROUSEL
    </div>
  )
}