'use client';

import CopyrightNotice from '@/components/shared/CopyrightNotice';
import Link from 'next/link';
import {
	Mail,
	MapPin,
	Facebook,
	Instagram,
	Twitter,
	ShieldCheck,
	Lock,
	BadgeCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
	return (
		<footer className="flex flex-col items-center border-t">
			<div className="wrapper max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-10">
				{/* ABOUT */}
				<div>
					<h3 className="text-xl font-semibold mb-4">About</h3>
					<p className="text-sm leading-6">
						We are a modern online store offering top-quality products at competitive prices. 
            Shopping with us means security, reliability, and satisfaction guaranteed.
					</p>
				</div>

				{/* NAVIGATION */}
				<div>
					<h3 className="text-xl font-semibold mb-4">Navigation</h3>
					<ul className="space-y-2 text-sm">
						<li>
							<Link href="/" className="hover:underline">
								About
							</Link>
						</li>
						<li>
							<Link href="/" className="hover:underline">
								FAQ
							</Link>
						</li>
						<li>
							<Link href="/" className="hover:underline">
								Contact
							</Link>
						</li>
						<li>
							<Link href="/" className="hover:underline">
								Terms of Service
							</Link>
						</li>
						<li>
							<Link
								href="/"
								className="hover:underline"
							>
								Privacy Policy
							</Link>
						</li>
					</ul>
				</div>

				{/* CONTACT */}
				<div>
					<h3 className="text-xl font-semibold mb-4">Contact</h3>
					<ul className="space-y-3 text-sm">
						{/* <li className="flex items-center gap-2">
							<Phone size={16} /> +48 123 456 789
						</li> */}
						<li className="flex items-center gap-2">
							<Mail size={16} /> contact@ram.com
						</li>
						<li className="flex items-center gap-2">
							<MapPin size={16} /> Unknow street 12a, Krakow
						</li>
					</ul>
				</div>

				{/* NEWSLETTER AND SECURITY BADGES */}
				<div>
					<h3 className="text-xl font-semibold mb-4">Newsletter</h3>
					<form className="flex flex-col gap-3">
						<Input
							type="email"
							placeholder="Twój e-mail"
							className="px-4 py-2 rounded-md"
						/>
						<Button
							type="submit"
							className="py-2 rounded-md font-medium cursor-pointer"
						>
							Subscribe
						</Button>
					</form>

					{/* SOCIAL MEDIA */}
					<div className="flex space-x-4 mt-6 text-gray-400">
						<Link href="#">
							<Facebook size={20} />
						</Link>
						<Link href="#">
							<Instagram size={20} />
						</Link>
						<Link href="#">
							<Twitter size={20} />
						</Link>
					</div>

					{/* SECURITY BADGES*/}
					<div className="flex flex-col gap-2 mt-6 text-sm text-gray-400">
						<div className="flex items-center gap-2">
							<ShieldCheck size={18} /> Secure Shopping
						</div>
						<div className="flex items-center gap-2">
							<Lock size={18} /> SSL Encryption
						</div>
						<div className="flex items-center gap-2">
							<BadgeCheck size={18} /> Quality Certified
						</div>
					</div>
				</div>
			</div>

			<div className="w-full flex justify-center items-center border-t py-4">
				<CopyrightNotice />
			</div>
		</footer>
	);
}
