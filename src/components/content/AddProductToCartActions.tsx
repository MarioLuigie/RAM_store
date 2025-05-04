'use client';
// lib
import { CartItem } from '@/lib/types/cart.types';
import { useCartActions } from '@/lib/hooks/useCartActions';
// components
import { Button } from '@/components/ui/button';
import ChangeProductQuantityButton from '@/components/content/ChangeProductQuantityButton';
import { Plus } from 'lucide-react';

export default function AddProductToCartActions({
	cartItem,
	productStock,
	quantity,
	setQuantity,
	existCartItem,
}: {
	cartItem: CartItem;
	productStock: number;
	quantity: number;
	setQuantity: React.Dispatch<React.SetStateAction<number>>;
	existCartItem: CartItem | undefined;
}) {

	const { addToCart, removeFromCart, canAdd, canRemove } = useCartActions({
		cartItem,
		productStock,
		quantity,
		setQuantity,
		existCartItem,
	});

	return (
		<div>
			{/* CHANGE QUANTITY OF ITEMS IN CART - ADDING OR REMOVING EXISTING ITEMS*/}
			<ChangeProductQuantityButton
				removeFromCart={removeFromCart}
				addToCart={addToCart}
				canRemove={canRemove}
				canAdd={canAdd}
				quantity={quantity}
			/>
			{/* ADD PRODUCT TO CART - ONLY ADDING ITEMS */}
			<div className="w-full mt-4">
				<Button
					disabled={canRemove}
					type="button"
					className="w-full cursor-pointer"
					onClick={addToCart}
				>
					<Plus />
					Add to Cart
				</Button>
			</div>
		</div>
	);
}

// 'use client';
// // lib
// import { Cart, CartItem } from '@/lib/types/cart.types';
// // import {
// // 	handleAddItemToCart,
// // 	handleRemoveItemFromCart,
// // } from '@/lib/handlers/cart.handlers';
// // import { useAddItemToCartToast } from '@/lib/hooks/useAddItemToCartToast';
// // import { useRemovedItemFromCartToast } from '@/lib/hooks/useRemovedItemFromCartToast';
// import { useCartActions } from '@/lib/hooks/useCartActions';
// // components
// import { Button } from '@/components/ui/button';
// import { Plus, Minus } from 'lucide-react';

// export default function AddProductToCartActions({
// 	cart,
// 	cartItem,
// 	productStock,
// 	quantity,
// 	setQuantity,
// 	existCartItem,
// }: {
// 	cart?: Cart | undefined;
// 	cartItem: CartItem;
// 	productStock: number;
// 	quantity: number;
// 	setQuantity: React.Dispatch<React.SetStateAction<number>>;
// 	existCartItem: CartItem | undefined;
// }) {
// 	console.log(cart, cartItem);

// 	// const { showAddItemToCartToast } = useAddItemToCartToast();
// 	// const { showRemovedItemFromCartToast } = useRemovedItemFromCartToast();
// 	const { addToCart, removeFromCart, canAdd, canRemove } = useCartActions({
// 		cartItem,
// 		productStock,
// 		quantity,
// 		setQuantity,
// 		existCartItem,
// 	});

// 	// const canAdd = quantity < productStock;
// 	// const canRemove = quantity > 0;

// 	// const updateQuantity = (delta: number) => {
// 	// 	setQuantity((prev) => Math.max(0, prev + delta));
// 	// };

// 	// const addToCart = async () => {
// 	// 	// Optimistic update – natychmiastowa zmiana UI
// 	// 	updateQuantity(+1);

// 	// 	try {
// 	// 		const result = await handleAddItemToCart(
// 	// 			cartItem,
// 	// 			showAddItemToCartToast
// 	// 		);

// 	// 		if (!result?.success) {
// 	// 			// Jeśli backend nie potwierdzi, cofamy zmianę
// 	// 			updateQuantity(-1);
// 	// 		}
// 	// 	} catch (error) {
// 	// 		console.error('Add to cart failed:', error);
// 	// 		// W przypadku błędu – również cofamy optimistic update
// 	// 		updateQuantity(-1);
// 	// 	}
// 	// };

// 	// const removeFromCart = async () => {
// 	// 	if (!existCartItem) return;
// 	// 	// Optimistic update
// 	// 	updateQuantity(-1);

// 	// 	try {
// 	// 		const result = await handleRemoveItemFromCart(
// 	// 			existCartItem.productId,
// 	// 			showRemovedItemFromCartToast
// 	// 		);

// 	// 		if (!result?.success) {
// 	// 			// Cofnięcie jeśli backend zwrócił błąd
// 	// 			updateQuantity(+1);
// 	// 		}
// 	// 	} catch (error) {
// 	// 		console.error('Remove from cart failed:', error);
// 	// 		updateQuantity(+1);
// 	// 	}
// 	// };

// 	return (
// 		<div>
// 			{/* CHANGE QUANTITY OF ITEMS IN CART - ADDING OR REMOVING EXISTING ITEMS*/}
// 			<div className="flex items-center justify-between mt-4">
// 				<Button
// 					disabled={!canRemove}
// 					type="button"
// 					variant="outline"
// 					className="cursor-pointer"
// 					onClick={removeFromCart}
// 				>
// 					<Minus className="h-4 w-4" />
// 				</Button>
// 				<span className="min-w-12 w-full flex-center text-xl px-2">
// 					{quantity || '0'}
// 				</span>
// 				<Button
// 					disabled={!canAdd}
// 					type="button"
// 					variant="outline"
// 					className="cursor-pointer"
// 					onClick={addToCart}
// 				>
// 					<Plus className="h-4 w-4" />
// 				</Button>
// 			</div>

// 			{/* ADD PRODUCT TO CART - ONLY ADDING ITEMS */}
// 			<div className="w-full mt-4">
// 				<Button
// 					disabled={canRemove}
// 					type="button"
// 					className="w-full cursor-pointer"
// 					onClick={addToCart}
// 				>
// 					<Plus />
// 					Add to Cart
// 				</Button>
// 			</div>
// 		</div>
// 	);
// }
