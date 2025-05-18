// modules
import {
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
	Sparkles,
	UserIcon,
} from 'lucide-react';
// lib
import { signOutUser } from '@/lib/actions/user.actions';
// components
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'next-auth';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/paths';

export default function LoggedInUserButton({ user }: { user: User }) {
	let fallbackMark: string = 'A';

	if (user?.name) {
		fallbackMark = user?.name.charAt(0);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex-center gap-3 px-2 py-1 rounded-md cursor-pointer">
					<Avatar className="h-8 w-8 rounded-lg">
						{/* <AvatarImage src={user?.avatar} alt={user?.name} /> */}
						<AvatarFallback className="rounded-lg">
							{fallbackMark}
						</AvatarFallback>
					</Avatar>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">{user?.name}</span>
						<span className="truncate text-xs">{user?.email}</span>
					</div>
					<ChevronsUpDown className="ml-auto size-4" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
				align="end"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar className="h-8 w-8 rounded-lg">
							{/* <AvatarImage src={user?.avatar} alt={user?.name} /> */}
							<AvatarFallback className="rounded-lg">
								{fallbackMark}
							</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">
								{user?.name}
							</span>
							<span className="truncate text-xs">{user?.email}</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="cursor-pointer">
						<Sparkles className="text-yellow-500" />
						<p className="text-gradient bg-gradient-to-r from-yellow-400 to-red-700 text-transparent bg-clip-text">
							Upgrade to Pro
						</p>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="cursor-pointer">
						<Link
							href={ROUTES.PROFILE}
							className="flex items-center gap-2"
						>
							<UserIcon />
							User Profile
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">
						<Link
							href={ROUTES.ORDERS}
							className="flex items-center gap-2"
						>
							<CreditCard />
							Order History
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">
						<Bell />
						Notifications
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<form action={signOutUser}>
					<button className="w-full">
						<DropdownMenuItem className="cursor-pointer">
							<LogOut />
							Log out
						</DropdownMenuItem>
					</button>
				</form>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
