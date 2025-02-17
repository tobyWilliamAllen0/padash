'use client';
import { Home, People, ElementPlus, Sort } from 'iconsax-react';
import { usePathname, useRouter } from 'next/navigation';

const BottomNavbar = () => {
	const router = useRouter();
	const pathname = usePathname();

	const navItems = [
		{ path: '/', icon: Home, label: 'خانه' },
		{ path: '/tops', icon: Sort, label: 'برترین' },
		{ path: '/friends', icon: People, label: 'دوستان' },
		{ path: '/points', icon: ElementPlus, label: 'امتیازگیری' },
	];

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-[#131313] py-2 border-t-[1px] border-[#272727] z-50">
			<div className="flex justify-around items-center max-w-md mx-auto">
				{navItems.map((item) => {
					const isActive = pathname === item.path;
					const IconComponent = item.icon;

					return (
						<button
							key={item.path}
							className={`flex flex-col items-center p-2 transition-colors ${
								isActive ? 'text-[#4d9ce2]' : 'text-[#727272]'
							}`}
							onClick={() => router.push(item.path)}
						>
							<IconComponent
								size="32"
								color={isActive ? '#4d9ce2' : '#727272'}
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
