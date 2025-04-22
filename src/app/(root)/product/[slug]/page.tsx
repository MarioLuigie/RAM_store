import ProductDetailsPage from '@/components/pages/ProductDetailsPage'

export default async function Page(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  console.log("SLUG", slug)
  return (
    <ProductDetailsPage slug={slug} />
  )
}