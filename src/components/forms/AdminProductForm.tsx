'use client';
// modules
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useTransition } from 'react';
// import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
// lib
import { ActionTypes } from '@/lib/constants/enums';
import { Product } from '@/lib/types/products.types';
// import { useCustomToast } from '@/lib/hooks/useCustomToast';
import {
	getProductFormDefaultValues,
	getProductFormSchema,
} from '@/lib/utils/validators';
// components
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Loader from '@/components/shared/Loader';
import { ArrowRight } from 'lucide-react';

type AdminProductFormProps = {
	actionType: ActionTypes;
	productId?: string;
	product?: Product;
};

export default function AdminProductForm({
	actionType,
	productId,
	product,
}: AdminProductFormProps) {
	// const router: AppRouterInstance = useRouter();
	// const { showCustomToast } = useCustomToast();
	const [isPending, startTransition] = useTransition();

	const ProductFormSchema = getProductFormSchema(actionType);

	const form = useForm<z.infer<typeof ProductFormSchema>>({
		resolver: zodResolver(ProductFormSchema),
		defaultValues: getProductFormDefaultValues(actionType, product),
	});

	// ON SUBMIT HANDLER
	const onSubmit: SubmitHandler<z.infer<typeof ProductFormSchema>> = async (
		productFormValues: z.infer<typeof ProductFormSchema>
	) => {
		startTransition(async () => {
      ((productFormValues) => {console.log(productFormValues)})(productFormValues)
      console.log(productId)
    });
	};

	return (
		<>
			<h1 className="text-xl  mb-3">
				{actionType === ActionTypes.CREATE ? 'Create' : 'Update'} Product
			</h1>
			<Form {...form}>
				<form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col md:flex-row gap-5 w-full">
						{/* NAME */}
						<div className="flex flex-col gap-5 w-full">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* SLUG */}
						<div className="flex flex-col gap-5 w-full">
							<FormField
								control={form.control}
								name="slug"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Slug</FormLabel>
										<FormControl>
											<Input placeholder="Slug" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<div className="flex flex-col md:flex-row gap-5 w-full">
						{/* CATEGORY */}
						<div className="flex flex-col gap-5 w-full">
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Category</FormLabel>
										<FormControl>
											<Input placeholder="Category" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* BRAND */}
						<div className="flex flex-col gap-5 w-full">
							<FormField
								control={form.control}
								name="brand"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Brand</FormLabel>
										<FormControl>
											<Input placeholder="Brand" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<div className="flex flex-col md:flex-row gap-5 w-full">
						{/* PRICE */}
						<div className="flex flex-col gap-5 w-full">
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Price</FormLabel>
										<FormControl>
											<Input placeholder="Price" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* STOCK */}
						<div className="flex flex-col gap-5 w-full">
							<FormField
								control={form.control}
								name="stock"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Stock</FormLabel>
										<FormControl>
											<Input placeholder="Stock" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<div className="flex flex-col md:flex-row gap-5 w-full">
						{/* IMAGES */}
						<div className="flex flex-col gap-5 w-full">
							<FormField
								control={form.control}
								name="images"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Images</FormLabel>
										<FormControl>
											<Input placeholder="Images" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<div className="flex flex-col md:flex-row gap-5 w-full">
						{/* IS FEATURED */}
						{/* <div className="flex flex-col gap-5 w-full">
							<FormField
								control={form.control}
								name="isFeatured"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Featured</FormLabel>
										<FormControl>
											<Input placeholder="Featured" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div> */}
					</div>

					<div className="flex flex-col md:flex-row gap-5 w-full">
						{/* DESCRIPTION */}
						<div className="flex flex-col gap-5 w-full">
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Input placeholder="Description" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					{/* SUBMIT BUTTON */}
					<div className="flex justify-end gap-2 w-full mt-4">
						<Button
							type="submit"
							disabled={isPending}
							className="cursor-pointer min-w-26"
							aria-label={
								actionType === ActionTypes.CREATE ? 'Create' : 'Update'
							}
						>
							{isPending ? (
								<Loader width={16} height={16} />
							) : (
								<ArrowRight />
							)}
							{actionType === ActionTypes.CREATE ? 'Create' : 'Update'}
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
}
