'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface MenuItem {
	name: string;
	href: string;
	icon: React.ReactNode;
}

export default function Sidebar() {
	const pathname = usePathname();

	const menuItems: MenuItem[] = [
		{
			name: 'Questions',
			href: '/admin/questions',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
				</svg>
			),
		},
		{
			name: 'Social',
			href: '/admin/social',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z"
						clipRule="evenodd"
					/>
				</svg>
			),
		},
		{
			name: 'Users',
			href: '/admin/users',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z"
						clipRule="evenodd"
					/>
				</svg>
			),
		},
	];

	return (
		<div className="bg-indigo-800 text-white w-16 md:w-64 flex flex-col">
			<div className="h-16 flex items-center justify-center md:justify-start px-4 md:px-6">
				<span className="hidden md:inline text-lg font-bold">Padash</span>
				<span className="md:hidden text-lg font-bold">P</span>
			</div>

			<nav className="flex-1 overflow-y-auto py-4">
				<ul className="space-y-2 px-2">
					{menuItems.map((item) => {
						const isActive = pathname === item.href;

						return (
							<li key={item.name} >
								<Link
									href={item.href}
									className={`flex items-center space-x-2 py-2 px-4 rounded-md ${
										isActive
											? 'bg-indigo-700 text-white'
											: 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
									}`}
								>
									{item.icon}
									<span className="hidden md:inline">{item.name}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
}
