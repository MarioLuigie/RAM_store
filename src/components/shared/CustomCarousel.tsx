'use client';
// components
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
// import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

export default function CustomCarousel({ data }: { data: ImageProps[] }) {
	console.log('$$$d', data[0]);
	return (
		<Carousel
			className="w-full"
			opts={{
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 6000,
					stopOnInteraction: true,
					stopOnMouseEnter: true,
				}),
			]}
		>
			<CarouselContent>
				<CarouselItem>
					{/* <Image
						src={data[0].url}
						alt="Image"
						width={1500}
						height={800}
						className="rounded-2xl"
					/> */}
					<video autoPlay loop muted className="">
						<source
							src="https://seris5q0p8.ufs.sh/f/AfznK49DWwCX9Q5zRGZgYbaieH6IvUyBr3Tjt4WGJPs5f7Cz"
							type="video/mp4"
						/>
					</video>
				</CarouselItem>
				<CarouselItem>
					<video autoPlay loop muted className="">
						<source
							src="https://seris5q0p8.ufs.sh/f/AfznK49DWwCXHVEP83OABV1yLj3OtiM6wRSPUrhxbEazNY28"
							type="video/mp4"
						/>
					</video>
				</CarouselItem>
				<CarouselItem>
					{' '}
					<video autoPlay loop muted className="">
						<source
							src="https://seris5q0p8.ufs.sh/f/AfznK49DWwCXDOm7lCu3ZObsfoXc2M7iUQprx4z5nYFIAawS"
							type="video/mp4"
						/>
					</video>
				</CarouselItem>
								<CarouselItem>
					{' '}
					<video autoPlay loop muted className="">
						<source
							src="https://seris5q0p8.ufs.sh/f/AfznK49DWwCXDhSqfwu3ZObsfoXc2M7iUQprx4z5nYFIAawS"
							type="video/mp4"
						/>
					</video>
				</CarouselItem>
								<CarouselItem>
					{' '}
					<video autoPlay loop muted className="">
						<source
							src="https://seris5q0p8.ufs.sh/f/AfznK49DWwCXa8U5QNHC4I0qncXP3wuAg7kyS1a9DeKpGWmE"
							type="video/mp4"
						/>
					</video>
				</CarouselItem>
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
