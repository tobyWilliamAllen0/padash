'use client';
import { Home, People, ElementPlus, Sort } from 'iconsax-react';
import { usePathname, useRouter } from 'next/navigation';

const BottomNavbar = () => {
	const router = useRouter();
	const pathname = usePathname();

	const navItems = [
		{ path: '/points', icon: ElementPlus, label: 'امتیازگیری' },
		{ path: '/friends', icon: People, label: 'دوستان' },
		{ path: '/tops', icon: Sort, label: 'برترین' },
		{ path: '/', icon: Home, label: 'خانه' },
	];

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-[#0D0E1F] py-2">
			<div className="flex justify-around items-center max-w-md mx-auto">
				{navItems.map((item) => {
					const isActive = pathname === item.path;
					const IconComponent = item.icon;

					return (
						<button
							key={item.path}
							className={`flex flex-col items-center p-2 transition-colors ${
								isActive ? 'text-[#FF8A65]' : 'text-gray-400'
							}`}
							onClick={() => router.push(item.path)}
						>
							<IconComponent
								size="32"
								color={isActive ? '#FF8A65' : '#6B7280'}
								variant={isActive ? 'TwoTone' : 'Linear'}
							/>
							<span className="text-sm mt-1">{item.label}</span>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default BottomNavbar;
