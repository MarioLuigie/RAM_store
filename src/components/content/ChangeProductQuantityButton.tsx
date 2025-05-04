// components
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

type ChangeCartContentButtonParams = {
  removeFromCart: () => Promise<void>
  addToCart: () => Promise<void>
  canRemove: boolean
  canAdd: boolean
  quantity: number
}

export default function ChangeProductQuantityButton({
  removeFromCart,
  addToCart,
  canRemove,
  canAdd,
  quantity,
}: ChangeCartContentButtonParams) {

  return (
    <div className="flex items-center justify-between mt-4">
    <Button
      disabled={!canRemove}
      type="button"
      variant="outline"
      className="cursor-pointer"
      onClick={removeFromCart}
    >
      <Minus className="h-4 w-4" />
    </Button>
    <span className="min-w-12 w-full flex-center text-xl px-2">
      {quantity || '0'}
    </span>
    <Button
      disabled={!canAdd}
      type="button"
      variant="outline"
      className="cursor-pointer"
      onClick={addToCart}
    >
      <Plus className="h-4 w-4" />
    </Button>
  </div>
  )
}