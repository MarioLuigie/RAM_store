import NewestArrivalsProducts from '@/components/content/NewestArrivalsProducts'

export default function HomePage() {
	return (
		<div className="flex justify-center">
			<NewestArrivalsProducts />
		</div>
	)
}

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// export default async function HomePage() {
// 	await delay(6000)
// 	return <div className="flex justify-center">HOME</div>
// }
