// modules
import { toast } from "sonner"
// lib
import { addToCart } from "@/lib/actions/cart.actions"

export async function handleAddToCart() {
  console.log("Added to Cart!")

  await addToCart()
  
  toast('Added to Cart')
}