'use client';
// components
import { Input } from '@/components/ui/input';

type SearchFieldProps = {
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchField({
	name,
	value,
	onChange,
}: SearchFieldProps) {
	return (
		<div className="px-10 w-full">
			<Input
				type="search"
				name={name}
				value={value}
				onChange={onChange}
				className="w-full md:min-w-[100px] lg:min-w-[300px]"
				placeholder="Search..."
			/>
		</div>
	);
}
