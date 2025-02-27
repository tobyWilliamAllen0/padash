'use client';
import useFetch from '@/hooks/useFetch';
import ApiClient from '@/lib/apiClient';
import axios from 'axios';
import { ArrowRight2, Star1 } from 'iconsax-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { useEffect, useState } from 'react';

export default function Home() {
	const router = useRouter();
	const [hash, setHash] = useState<string>(
		'user=%7B%22id%22%3A54200739%2C%22first_name%22%3A%22Alireza%22%2C%22last_name%22%3A%22T%F0%9F%98%B6%E2%80%8D%F0%9F%8C%AB%EF%B8%8F%22%2C%22username%22%3A%22Alirezatahani%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FaAyicCE7F5eB_SotoFbqxPKvMBHC9yaN3qC9sfiO5vI.svg%22%7D&chat_instance=-1916207976170099950&chat_type=sender&auth_date=1739546970&signature=zRO5sAFS86L3f2aBUdNpCD66dVbXa7GsMmeCjj7eOzMbrUL8WXjim9-bbKTmQf0qWHzftFO9DUnWwRXqPGaDCQ&hash=99570ed1c34ab9f1ce8b1228b986db81e6fc0ddc575f87f8432844b7259b746a',
	);

	const [userProfileState, fetchUserProfile] = useFetch({
		onSuccess(res: any) {
			setCookie(null, 'userProfile', JSON.stringify(res), {
				path: '/',
				maxAge: 30 * 24 * 60 * 60,
				sameSite: true,
			});
		},
	});

	useEffect(() => {
		const interval = setTimeout(() => {
			const app =
				typeof window !== 'undefined' ? (window as any)?.Telegram?.WebApp : {};

			if (app) {
				console.log(app.initData, 'app.initData');
				setHash(app.initData);
			}
		}, 2000);

		return () => clearTimeout(interval);
	}, []);

	useEffect(() => {
		if (hash) {
			fetchUserProfile({
				url: 'user/profile',
				method: 'POST',
				data: {
					hash: hash.toString(),
					referral_code: 'string',
				},
			});
		}
	}, [hash]);

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
						{userProfileState?.response?.user?.total_scores.toLocaleString(
							'fa-IR',
						)}
					</span>
					<ArrowRight2 size="18" color="#666666" />

					<span className="text-lg text-[#808080] text-center font-bold">
						امتیاز شما
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
