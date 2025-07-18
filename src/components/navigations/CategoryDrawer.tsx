// components
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	DrawerDescription,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { VenusAndMars, X } from 'lucide-react';
// lib
import { getAllCategories } from '@/lib/actions/product.actions';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/paths';

export default async function CategoryDrawer() {
	const { success, data } = await getAllCategories();

	if (!success || !data || !data) {
		return <div className="text-sm ml-4">Categories not found.</div>;
	}

	return (
		<Drawer direction="left">
			<DrawerTrigger className="cursor-pointer text-my-gray ml-4">
				<VenusAndMars />
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<div className="flex justify-between items-center mb-6">
						<DrawerTitle>Select a category</DrawerTitle>
						<DrawerClose className="cursor-pointer" autoFocus>
							<X />
						</DrawerClose>
					</div>
					<DrawerDescription className="mb-4">
						You can choose category below
					</DrawerDescription>
					<div className="flex flex-col space-y-2">
						{data.map((item) => (
							<Button
								key={item.category}
								variant="outline"
								className="cursor-pointer"
								asChild
							>
								<DrawerClose asChild>
									<Link
										href={`${ROUTES.SEARCH}?category=${item.category}`}
										className="flex justify-between items-center"
									>
										<p>{item.category}</p> 
										<p>{`(${item._count} ${item._count > 1 ? 'pcs' : 'pc'})`}</p>
									</Link>
								</DrawerClose>
							</Button>
						))}
					</div>
				</DrawerHeader>
				<DrawerFooter>
					<div>store categories</div>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
