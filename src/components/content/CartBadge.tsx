'use client';

export default function CartBadge({ quantity }: { quantity: number }) {
	if (!quantity) return null;

	return (
		<span className="absolute top-3 -left-4 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
			{quantity}
		</span>
	);
}
