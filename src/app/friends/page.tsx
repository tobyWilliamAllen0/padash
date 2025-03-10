'use client';

import useFetch from '@/hooks/useFetch';
import { Profile2User } from 'iconsax-react';
import { useEffect } from 'react';

interface Friend {
	username: 'string';
	first_name: 'string';
	last_name: 'string';
	score: number;
}
export default function Friends() {
	const [friendsState, fetchFriends] = useFetch();

	useEffect(() => {
		fetchFriends({
			url: 'user/referrals',
			method: 'GET',
		});
	}, []);

	return (
		<div
			className="p-4 overflow-hidden w-full flex flex-col justify-between items-center"
			style={{ height: 'calc(100vh - 81px)' }}
		>
			<div className="flex flex-col">
				<div className="w-full flex flex-col justify-right items-start mt-4 gap-2">
					<span className="text-3xl text-white text-right font-bold">
						معرفی دوستان
					</span>

					<span className="text-xl text-[#5b5b5b] text-right font-bold">
						با <span className="text-[#fafafa]">معرفی</span> هر کدام از
						دوستانتان
						<span className="text-[#fafafa] pr-1">۱۰۰۰ امتیاز</span> اضافه کنید
						و شانس خود را افزایش دهید{' '}
					</span>
				</div>
				<div className="w-full flex justify-between items-center mt-2 p-2 bg-[#151515] rounded-md">
					<span className="text-base text-white font-bold">مجموع دعوت ها</span>
					<span className="text-base text-white font-bold">
						{Number(friendsState?.response?.length ?? 0).toLocaleString(
							'fa-IR',
						)}{' '}
						نفر
					</span>
				</div>
				<div className="w-full flex flex-col justify-between items-center mt-4 p-2 bg-[#151515] rounded-md">
					{friendsState?.response?.map((friend: Friend, index: number) => {
						return (
							<div
								key={friend.username + index}
								className="w-full flex justify-between items-center mt-2 h-16 border-b border-[#333333]"
							>
								<div className="flex flex-row gap-2 items-center">
									<div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#7c7c7c]">
										<Profile2User variant="Bulk" size="20" color="#fff" />
									</div>
									<div className="flex flex-col items-start">
										<span className="text-base text-[#f7f7f7] ">
											{friend.first_name} {friend.last_name}
										</span>
										<span className="text-xs text-[#828183] ">
											۱۲ فروردین ساعت ۱۲:۳۲
										</span>
									</div>
								</div>
								<div className="flex flex-col items-end">
									<span className="text-xl text-[#f7f7f7] ">
										{friend.score}
									</span>
									<span className="text-xs text-[#43805c] ">دریافت شد</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<button className="rounded-md bg-[#1f9ee7] text-white font-bold text-lg w-full mt-6 p-2">
				دعوت از دوستان
			</button>
		</div>
	);
}
