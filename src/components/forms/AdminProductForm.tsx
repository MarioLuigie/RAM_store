'use client';
// modules
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useTransition } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
// lib
import { ActionTypes } from '@/lib/constants/enums';
import { Product, UpdateProduct } from '@/lib/types/products.types';
import { useCustomToast } from '@/lib/hooks/useCustomToast';
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
import slugify from 'slugify';
import { Textarea } from '../ui/textarea';
import {
	handleCreateProduct,
	handleUpdateProduct,
} from '@/lib/handlers/product.handlers';
import { UploadDropzone } from '@/lib/uploads/uploadthing';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';

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
	const router: AppRouterInstance = useRouter();
	const { showCustomToast } = useCustomToast();
	const [isPending, startTransition] = useTransition();
	const isCreating = actionType === ActionTypes.CREATE;
	const isUpdating = actionType === ActionTypes.UPDATE;

	const ProductFormSchema = getProductFormSchema(actionType);
	const productFormDefaultValues = getProductFormDefaultValues(
		actionType,
		product
	);

	const form = useForm<z.infer<typeof ProductFormSchema>>({
		resolver: zodResolver(ProductFormSchema),
		defaultValues: productFormDefaultValues,
	});

	const images = form.watch('images');

	// ON SUBMIT HANDLER
	const onSubmit: SubmitHandler<z.infer<typeof ProductFormSchema>> = async (
		productFormValues: z.infer<typeof ProductFormSchema>
	) => {
		startTransition(async () => {
			// CREATE PRODUCT
			if (isCreating) {
				await handleCreateProduct(
					productFormValues,
					showCustomToast,
					router
				);
			}

			// UPDATE PRODUCT
			if (isUpdating) {
				await handleUpdateProduct(
					productId,
					productFormValues as UpdateProduct,
					showCustomToast,
					router
				);
			}

			// ((productFormValues) => {
			// 	console.log(productFormValues);
			// })(productFormValues);
		});
	};

	return (
		<>
			<h1 className="text-xl  mb-3">
				{actionType === ActionTypes.CREATE
					? ActionTypes.CREATE
					: ActionTypes.UPDATE}{' '}
				Product
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
											<Input
												placeholder="Enter product name"
												{...field}
											/>
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
											<div className="relative">
												<Input
													placeholder="Enter slug"
													{...field}
												/>
												<Button
													type="button"
													className="px-4 py-1 mt-4"
													onClick={() =>
														form.setValue(
															'slug',
															slugify(form.getValues('name'), {
																lower: true,
															})
														)
													}
												>
													Generate
												</Button>
											</div>
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
											<Input
												placeholder="Enter product category"
												{...field}
											/>
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
											<Input
												placeholder="Enter product brand"
												{...field}
											/>
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
											<Input
												placeholder="Enter product price"
												{...field}
											/>
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
											<Input
												placeholder="Enter product stock"
												{...field}
											/>
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
								render={() => (
									<FormItem className="w-full">
										<FormLabel>Images</FormLabel>
										<Card>
											<CardContent className="space-y-2 mt-2 min-h-48">
												<div className="flex-center space-x-2">
													{images.map((image: string) => (
														<Image
															key={image}
															src={image}
															alt="product image"
															className="w-20 h-20 object-cover object-center rounded-sm"
															width={100}
															height={100}
														/>
													))}
													<FormControl>
														<UploadDropzone
															endpoint="imageUploader"
															onClientUploadComplete={(
																res: { url: string }[]
															) => {
																form.setValue('images', [
																	...images,
																	res[0].url,
																]);
															}}
															onUploadError={(error) => {
																showCustomToast(
																	`ERROR! ${error.message}`,
																	false
																);
															}}
															// className="ut-button:text-black ut-button:dark:text-white ut-label:text-black ut-label:dark:text-white ut-button:bg-blue-100 ut-button:dark:bg-zinc-800"
															appearance={{
																container:
																	'bg-white dark:bg-zinc-800 p-4 border rounded',
																uploadIcon: 'text-zinc-800 dark:text-zinc-600',
																label: 'text-black dark:text-white',
																allowedContent:
																	'text-sm text-gray-400',
																button: ({ isUploading }) =>
																	isUploading
																		? 'opacity-50 cursor-not-allowed'
																		: 'bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 cursor-pointer',
															}}
														/>

														{/* <UploadButton
															className="p-4 border-2 rounded-md dark:text-red-400 text-blue-300"
															endpoint="imageUploader"
															onClientUploadComplete={(
																res: { url: string }[]
															) => {
																form.setValue('images', [
																	...images,
																	res[0].url,
																]);
															}}
															onUploadError={(error: Error) => {
																showCustomToast(
																	`ERROR! ${error.message}`,
																	false
																);
															}}
														/> */}
													</FormControl>
												</div>
											</CardContent>
										</Card>
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
											<Textarea
												placeholder="Enter product description"
												{...field}
												className="min-h-[130px] resize-none"
											/>
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
								actionType === ActionTypes.CREATE
									? ActionTypes.CREATE
									: ActionTypes.UPDATE
							}
						>
							{isPending ? (
								<Loader width={16} height={16} />
							) : (
								<ArrowRight />
							)}
							{actionType === ActionTypes.CREATE
								? ActionTypes.CREATE
								: ActionTypes.UPDATE}
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
}
