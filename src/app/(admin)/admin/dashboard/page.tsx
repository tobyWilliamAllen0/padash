'use client';

import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../../components/Sidebar';
import DashboardHeader from '../../../../components/DashboardHeader';
import ScaleLoader from 'react-spinners/ScaleLoader';

interface DashboardStats {
	totalScore: number;
	rank: number;
	completedQuestions: number;
}

export default function Dashboard() {
	const [loading, setLoading] = useState(true);
	const [stats, setStats] = useState<DashboardStats | null>(null);
	const router = useRouter();

	useEffect(() => {
		// Check if user is logged in
		// const cookies = parseCookies();
		// const token = cookies['auth_token'];
		// if (!token) {
		// 	router.push('/login');
		// 	return;
		// }
		// // Fetch dashboard data
		// const fetchDashboardData = async () => {
		// 	try {
		// 		// Replace with actual API call
		// 		// const response = await fetch('/api/dashboard/stats');
		// 		// const data = await response.json();
		// 		// Simulated data
		// 		const data = {
		// 			totalScore: 1250,
		// 			rank: 42,
		// 			completedQuestions: 75,
		// 		};
		// 		setStats(data);
		// 		setLoading(false);
		// 	} catch (error) {
		// 		console.error('Failed to fetch dashboard data', error);
		// 		setLoading(false);
		// 	}
		// };
		// fetchDashboardData();
	}, [router]);

	return (
		<div className="flex h-screen bg-gray-100">
			<Sidebar />

			<div className="flex-1 flex flex-col overflow-hidden">
				<DashboardHeader />

				<main className="flex-1 overflow-y-auto p-4">
					{loading ? (
						<div className="h-full flex items-center justify-center">
							<ScaleLoader
								color="#4F46E5"
								loading={loading}
								aria-label="Loading Spinner"
								data-testid="loader"
								height={35}
							/>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="bg-white p-6 rounded-lg shadow-md">
								<h3 className="text-lg font-semibold text-gray-700">
									Total Score
								</h3>
								<p className="text-3xl font-bold text-indigo-600 mt-2">
									{stats?.totalScore}
								</p>
							</div>

							<div className="bg-white p-6 rounded-lg shadow-md">
								<h3 className="text-lg font-semibold text-gray-700">
									Current Rank
								</h3>
								<p className="text-3xl font-bold text-indigo-600 mt-2">
									#{stats?.rank}
								</p>
							</div>

							<div className="bg-white p-6 rounded-lg shadow-md">
								<h3 className="text-lg font-semibold text-gray-700">
									Questions Completed
								</h3>
								<p className="text-3xl font-bold text-indigo-600 mt-2">
									{stats?.completedQuestions}
								</p>
							</div>

							<div className="bg-white p-6 rounded-lg shadow-md md:col-span-3">
								<h3 className="text-lg font-semibold text-gray-700 mb-4">
									Recent Activity
								</h3>
								<div className="space-y-3">
									{/* Recent activity items would go here */}
									<div className="border-b pb-2">
										<p className="text-sm text-gray-600">
											You earned 50 points for answering a question correctly
										</p>
										<p className="text-xs text-gray-400">2 hours ago</p>
									</div>
									<div className="border-b pb-2">
										<p className="text-sm text-gray-600">
											You moved up 3 ranks in the leaderboard
										</p>
										<p className="text-xs text-gray-400">Yesterday</p>
									</div>
								</div>
							</div>
						</div>
					)}
				</main>
			</div>
		</div>
	);
}
