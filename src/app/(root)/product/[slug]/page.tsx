import ProductDetailsPage from '@/components/pages/ProductDetailsPage'

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	return <ProductDetailsPage slug={slug} />
}

// NEXT.JS 14 - OLD APRAUCH - PARAMS IS NOT A PROMISE
// export default async function Page({
//   params,
// }: {
//   params: { slug: string }
// }) {
//   const { slug } = params
//   console.log("SLUG", slug)

//   return <ProductDetailsPage slug={slug} />
// }
// Server   Error: Route "/product/[slug]" used `params.slug`. `params` should be awaited before using its properties. Learn more