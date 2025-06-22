import { getAllCategories } from "@/lib/actions/product.actions"

export default async function Search() {
  const { success, data } = await getAllCategories();

  console.log('ALL CATEGORIES:', success, data)
  return (
    <div>
      SEARCH
    </div>
  )
}