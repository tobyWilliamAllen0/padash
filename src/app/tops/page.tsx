'use client';
import useFetch from '@/hooks/useFetch';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import { useCallback, useEffect, useMemo } from 'react';

interface TopUser {
	username: 'string';
	first_name: 'string';
	last_name: 'string';
	total_scores: 0;
}
interface Leaderboard {
	rank: 0;
	top_users: TopUser[];
}
export default function Tops() {
	const userProfile = parseCookies()['userProfile'];
	const user = userProfile ? JSON.parse(userProfile)?.user : {};

	const [leaderboardState, fetchLeaderboard] = useFetch();

	useEffect(() => {
		fetchLeaderboard({
			url: 'user/leaderboard',
			method: 'GET',
		});
	}, []);

	const colors = useCallback((index: number) => {
		switch (index) {
			case 0:
				return '#2d2b1c';
			case 1:
				return '#272727';
			case 2:
				return '#2d251b';
			default:
				return '#151515';
		}
	}, []);

	return (
		<div
			className="p-4 overflow-hidden flex flex-col justify-start items-center"
			style={{ height: 'calc(100vh - 81px)' }}
		>
			<div className="w-[258px] h-[258px] flex flex-col items-center justify-center text-4xl">
				<Image
					src="/assets/images/logo.png"
					alt="Logo"
					width={258}
					height={258}
				/>
				<span className="text-2xl text-white text-center font-bold">
					رتبه بندی
				</span>
			</div>
			<div className="w-full flex flex-row items-center justify-between bg-[#151515] p-2 rounded-lg">
				<span className="text-base text-white text-center ">
					کل شرکت کنندگان
				</span>
				<span className="text-base text-white text-center ">
					{Number(21323657).toLocaleString('fa-IR')}
				</span>
			</div>
			<div className="w-full flex justify-between items-center mt-4 bg-[#fff] rounded-lg p-4 h-auto">
				<span className="text-base text-[#000000] ">
					#
					{Number(leaderboardState?.response?.rank ?? 0).toLocaleString(
						'fa-IR',
					)}
				</span>
				<div className="flex flex-row gap-2 items-center">
					<div className="flex flex-col items-end justify-center">
						<span className="text-base text-[#000000] ">{user.username}</span>
						<span className="text-sm text-[#3b3b3b] ">
							{user.first_name} {user.last_name}
						</span>
					</div>
					<div className="flex items-center justify-center bg-black rounded-lg w-10 h-10">
						<span className="text-3xl text-white font-bold">P</span>
					</div>
				</div>
			</div>

			<div className="max-h-[350px] overflow-y-auto w-full mt-6">
				{leaderboardState?.response?.top_users?.map(
					(topUser: TopUser, index: number) => (
						<div
							className={`w-full flex flex-row items-center justify-between bg-[${colors(
								index,
							)}] h-16 p-2 ${index === 0 ? 'rounded-t-lg' : ''}`}
						>
							<span className="text-base text-[#fff] ">
								# {Number(index + 1).toLocaleString('fa-IR')}
							</span>
							<div className="flex flex-row gap-2 items-center">
								<div className="flex flex-col items-end justify-center">
									<span className="text-base text-[#fff] ">
										{topUser.username}
									</span>
									<span className="text-sm text-[#7b7972] ">
										{Number(topUser.total_scores).toLocaleString('fa-IR')}
									</span>
								</div>
								<div className="flex items-center justify-center bg-white rounded-lg w-10 h-10">
									<span className="text-3xl text-black font-bold">P</span>
								</div>
							</div>
						</div>
					),
				)}
			</div>
		</div>
	);
}
