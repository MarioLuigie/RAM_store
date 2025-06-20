import NewestArrivalsProducts from '@/components/content/NewestArrivalsProducts'
import ProductCarousel from '../content/ProductCarousel'

export default function HomePage() {
	return (
		<div className="flex flex-col items-center">
			<ProductCarousel />
			<NewestArrivalsProducts />
		</div>
	)
}

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
// export default async function HomePage() {
// 	await delay(6000)
// 	return <div className="flex justify-center">HOME</div>
// }
