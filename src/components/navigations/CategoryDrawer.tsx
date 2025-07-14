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
import { VenusAndMars } from 'lucide-react';
// lib
import { getAllCategories } from '@/lib/actions/product.actions';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/paths';

export default async function CategoryDrawer() {
	const { success, data } = await getAllCategories();

	if (!success || !data) {
		return <div className="text-sm ml-4">Categories not found.</div>;
	}

	return (
		<Drawer direction="left">
			<DrawerTrigger className="cursor-pointer text-my-gray ml-4">
				<VenusAndMars />
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Select a category</DrawerTitle>
					<DrawerDescription>You can choose category below</DrawerDescription>
					<div className="flex flex-col space-y-2 mt-4">
						{data.map(({ category }) => (
							<Button
								key={category}
								variant="outline"
								className="cursor-pointer"
								asChild
							>
								<DrawerClose asChild>
									<Link href={`${ROUTES.SEARCH}?category=${category}`}>
										{category}
									</Link>
								</DrawerClose>
							</Button>
						))}
					</div>
				</DrawerHeader>
				<DrawerFooter>
					<Button autoFocus>Submit</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
