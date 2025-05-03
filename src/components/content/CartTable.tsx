'use client'
//lib
import { Cart } from '@/lib/types/cart.types';

export default function CartTable({
  cart
}: {
  cart?: Cart
}) {
  console.log(cart)
  
  return (
    <div>
      TABLE
    </div>
  )
}