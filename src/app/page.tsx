'use client';
import useFetch from '@/hooks/useFetch';
import { ArrowRight2, Star1 } from 'iconsax-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { useEffect, useState } from 'react';

export default function Home() {
	const router = useRouter();
	const [hash, setHash] = useState<string>('');
	const [userProfileState, getUserProfile] = useFetch();
	const [userLeaderBoardState, getUserLeaderBoard] = useFetch();

	const app =
		typeof window !== 'undefined' ? (window as any)?.Telegram?.WebApp : {};

	useEffect(() => {
		if (app) {
			console.log(app.initData, 'app.initData');
			setHash(app.initData);
		}
	}, [app]);

	useEffect(() => {
		if (hash) {
			getUserProfile({
				url: 'user/profile',
				method: 'POST',
				data: {
					hash: hash.toString(),
					referral_code: 'string',
				},
			});
		}
	}, [hash]);

	const [state, setState] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setState((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (userProfileState.response) {
			setCookie(
				null,
				'userProfile',
				JSON.stringify(userProfileState.response.data.result),
				{
					path: '/',
					maxAge: 30 * 24 * 60 * 60,
					sameSite: true,
				},
			);

			getUserLeaderBoard({
				url: 'user/leaderboard',
				method: 'GET',
			});
		}
	}, [userProfileState.response]);
	console.log(userProfileState, 'userProfileState');

	return (
		<div className="p-4 overflow-hidden h-screen flex flex-col items-center justify-between">
			<div className="flex flex-col items-center">
				<div className="w-[258px] h-[258px] flex items-center justify-center text-4xl">
					<Image
						src="/assets/images/logo.png"
						alt="Logo"
						width={258}
						height={258}
					/>
				</div>
				<div className="w-full flex justify-center items-center">
					<span className="text-lg text-white text-center font-bold px-10">
						سال پاداش: جشنواره جوایز ۱۰ سالگی گروه مالی پاداش
					</span>
				</div>
				<div className="w-full flex justify-center items-center mt-4 gap-1">
					<span className="text-lg text-[#808080] text-center font-bold">
						{userLeaderBoardState.response?.data.result.rank.toLocaleString(
							'fa-IR',
						)}
					</span>
					<ArrowRight2 size="18" color="#666666" />

					<span className="text-lg text-[#808080] text-center font-bold">
						رتبه شما
					</span>
					<Image
						src="/assets/images/trophy2.webp"
						alt="trophy"
						width={28}
						height={28}
					/>
				</div>
			</div>
			<div className="pb-[90px] flex flex-col items-center gap-3 w-full">
				<div className="w-[100%] bg-[#151515] rounded-lg flex items-center justify-between p-2 border-[#393939] border-[1px] ">
					<div className="flex flex-row items-center gap-1">
						<ArrowRight2 size="18" color="#666666" />
						<span className="text-base font-bold text-white text-right">
							ثبت شماره موبایل
						</span>{' '}
						<span className="text-sm text-white pr-1">
							(برای شرکت در قرعه کشی)
						</span>
					</div>
					<Star1 size="18" color="#fcfcfc" variant="Bulk" />
				</div>
				<div
					className="w-[100%] bg-[#151515] rounded-lg flex items-center justify-between p-2 border-[#393939] border-[1px] "
					onClick={() => router.push('https://t.me/padash_sarmayeh')}
				>
					<div className="flex flex-row items-center gap-1">
						<ArrowRight2 size="18" color="#666666" />
						<span className="text-base font-bold text-white text-right">
							کانال تلگرام گروه مالی پاداش
						</span>
					</div>
					<Star1 size="18" color="#fcfcfc" variant="Bulk" />
				</div>
				<div className="w-[100%] bg-[#151515] rounded-lg flex items-center justify-between p-2 border-[#393939] border-[1px] ">
					<div className="flex flex-row items-center gap-1">
						<ArrowRight2 size="18" color="#666666" />
						<span className="text-base font-bold text-white text-right">
							سوابق امتیازات دریافت شده{' '}
						</span>
					</div>
					<Star1 size="18" color="#fcfcfc" variant="Bulk" />
				</div>
			</div>
		</div>
	);
}
