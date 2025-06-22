// modules
import { SearchIcon } from 'lucide-react';
// lib
import { getAllCategories } from '@/lib/actions/product.actions';
// components
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default async function SearchProduct() {
	const { success, data } = await getAllCategories();

	if (!success || !data) throw new Error('Categories not found');

	return (
		<form action="/search" method="GET">
			<div className="flex items-center gap-2">
				<Select name='category' defaultValue='all'>
					<SelectTrigger className="w-[100px] cursor-pointer">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem
							key='All'
							value='all'
							className="cursor-pointer"
						>
							All
						</SelectItem>
						{data.map((item) => (
							<SelectItem
								key={item.category}
								value={item.category}
								className="cursor-pointer"
							>
								{item.category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Input
					type="text"
					name="query"
					placeholder="Search..."
					className="md:w-[100px] lg:w-[300px]"
				/>
				<Button variant="outline">
					<SearchIcon />
				</Button>
			</div>
		</form>
	);
}
