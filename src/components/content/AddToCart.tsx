'use client'
// modules
// import { useRouter } from 'next/navigation'
// import { Plus } from 'lucide-react'
// lib
import { CartItem } from '@/lib/types/cart.types'
// components
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function AddToCart({ item }: { item: CartItem }) {
	console.log(item)


	return (
    <div className='w-full mt-4'>
     <Button className='w-full cursor-pointer' onClick={() => toast('I was clicked')}>Click</Button>
    </div>
  )
}
