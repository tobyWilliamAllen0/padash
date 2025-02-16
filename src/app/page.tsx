'use client';
import BottomNavbar from '@/components/bottomNavbar';
import { useEffect, useState } from 'react';
import { ArrowRight2, Star1 } from 'iconsax-react';

export default function Home() {
	const [hash, setHash] = useState('');
	const app =
		typeof window !== 'undefined' ? (window as any)?.Telegram?.WebApp : {};

	useEffect(() => {
		if (app) {
			setHash(app.initData);
		}
	}, [app]);

	const [state, setState] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setState((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="p-4">
			<div className="w-[100%] h-[150px] border-dashed border-2 border-red-500 mt-40 flex items-center justify-center text-4xl">
				350 * 150
			</div>
			<div className="w-full flex justify-center items-center mt-10">
				<span className="text-lg text-white text-center font-bold px-10">
					سال پاداش: جشنواره جوایز ۱۰ سالگی گروه مالی پاداش
				</span>
			</div>
			<div className="mt-20 flex flex-col items-center gap-3 ">
				<div className="w-[100%] bg-[#1e1e1e] rounded-md flex items-center justify-between p-2 border-[#2c2c2c] border-[1px] ">
					<ArrowRight2 size="24" color="#FF8A65" variant="Bulk" />
					<span className="text-lg font-bold text-white text-center">
						ثبت شماره موبایل
					</span>
					<span className="text-sm text-white ">(برای شرکت در قرعه کشی)</span>
					<Star1 size="24" color="#FF8A65" variant="Bulk" />
				</div>
				<div className="w-[100%] bg-[#1e1e1e] rounded-md flex items-center justify-between p-2 border-[#2c2c2c] border-[1px] ">
					<ArrowRight2 size="24" color="#FF8A65" variant="Bulk" />
					<span className="text-lg font-bold text-white text-center">
						کانال تلگرام گروه مالی پاداش
					</span>
					<Star1 size="24" color="#FF8A65" variant="Bulk" />
				</div>
				<div className="w-[100%] bg-[#1e1e1e] rounded-md flex items-center justify-between p-2 border-[#2c2c2c] border-[1px] ">
					<ArrowRight2 size="24" color="#FF8A65" variant="Bulk" />
					<span className="text-lg font-bold text-white text-center">
						سوابق امتیازات دریافت شده{' '}
					</span>
					<Star1 size="24" color="#FF8A65" variant="Bulk" />
				</div>
			</div>
			<BottomNavbar />
		</div>
	);
}
