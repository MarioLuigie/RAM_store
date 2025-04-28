import { useCallback } from 'react';
import { toast } from 'sonner'; // albo skąd masz import toasta
import Image from 'next/image';
import { X } from 'lucide-react'; // zakładam, że X masz z lucide-react
import { CartItem } from '@/lib/types/cart.types';

// Custom hook
export function useCartToast() {
  const showCartToast = useCallback((message: string, item: CartItem) => {
    toast.custom((id) => (
      <div className="relative flex items-center gap-3 px-4 py-2 rounded-md border-[1px] border-[#e9e9e9] dark:border-[#3d3d3d] shadow-md dark:bg-[#252525] bg-[#f7f7f7] dark:text-zinc-100 text-[#383838]">
        <p>{message}</p>
        <Image
          src={item.image}
          alt={item.name}
          className="w-[50px] h-[50px] flex-shrink-0 mr-2.5 rounded-xs"
          width={50}
          height={50}
        />
        <button
          onClick={() => toast.dismiss(id)}
          className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 w-4"
        >
          <X className="w-4" />
        </button>
      </div>
    ));
  }, []);

  return { showCartToast };
}
