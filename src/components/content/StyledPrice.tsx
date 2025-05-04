import { formatCurrencyParts } from '@/lib/utils/utils';

export default function StyledPrice({
	price,
}: {
	price: string | number;
}) {
	const { currency, integer, fraction, symbolFirst, literal } =
		formatCurrencyParts(price);
	return (
		<p>
			{symbolFirst && (
				<span className="font-medium text-sm align-super">{currency}</span>
			)}
			<span className="font-medium text-2xl">{integer}</span>
			{fraction && (
				<>
					<span className="text-2xl">{literal || ','}</span>
					<span className="text-sm font-medium align-super">
						{fraction}
					</span>
				</>
			)}
			{!symbolFirst && (
				<span className="font-medium text-sm align-super">{currency}</span>
			)}
		</p>
	);
}
