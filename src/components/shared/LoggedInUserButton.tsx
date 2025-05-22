// modules
import {
	Bell,
	ChevronDown,
	LogOut,
	Sparkles,
	UserIcon,
	ShoppingBag,
	PanelsTopLeft,
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
import { AuthRole } from '@/lib/constants/enums';

export default function LoggedInUserButton({ user }: { user: User }) {
	let fallbackMark: string = 'A';
	const isAdmin = user.role === AuthRole.ADMIN;

	if (user?.name) {
		fallbackMark = user?.name.charAt(0);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="min-w-52">
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
					<ChevronDown className="ml-auto size-4" />
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

				{!isAdmin && (
					<>
						<DropdownMenuGroup>
							<DropdownMenuItem className="cursor-pointer">
								<Sparkles className="text-yellow-500" />
								<p className="text-gradient bg-gradient-to-r from-yellow-400 to-red-700 text-transparent bg-clip-text">
									Upgrade to Pro
								</p>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
					</>
				)}

				<DropdownMenuGroup>
					<DropdownMenuItem className="cursor-pointer">
						<Bell />
						Notifications
					</DropdownMenuItem>

					<DropdownMenuItem className="cursor-pointer">
						<Link
							href={ROUTES.USER_PROFILE}
							className="flex items-center gap-2"
						>
							<UserIcon />
							User Profile
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem className="cursor-pointer">
						<Link
							href={ROUTES.USER_ORDERS}
							className="flex items-center gap-2"
						>
							<ShoppingBag />
							Orders History
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />

				{isAdmin && (
					<>
						<DropdownMenuGroup>
							<DropdownMenuItem className="cursor-pointer">
								<Link
									href={ROUTES.ADMIN_OVERVIEW}
									className="flex items-center gap-2"
								>
									<PanelsTopLeft />
									Admin
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
					</>
				)}

				<DropdownMenuGroup>
					<form action={signOutUser}>
						<button className="w-full flex justify-end">
							<DropdownMenuItem className="cursor-pointer">
								<LogOut />
								Log out
							</DropdownMenuItem>
						</button>
					</form>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
