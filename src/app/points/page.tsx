'use client';

import FlipCardGame from '@/components/flipCardGame';
import Tab from '@/components/Tab';
import { useEffect, useMemo, useRef } from 'react';
import { Question } from './content/question';
import useFetch from '@/hooks/useFetch';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function Points() {
	const [questionState, fetchQuestion] = useFetch();

	useEffect(() => {
		fetchQuestion({
			url: 'admin/question',
			method: 'GET',
		});
	}, []);

	const tabs = useMemo(
		() => [
			{
				label: 'معما',
				content: <FlipCardGame />,
			},
			{
				label: 'مدیریت مالی',
				content: <FlipCardGame />,
			},
			{
				label: 'سوال',
				content: questionState?.isLoading ? (
					<div className="h-48 flex items-center justify-center w-full">
						<ScaleLoader
							color="#fff"
							loading={questionState.isLoading}
							aria-label="Loading Spinner"
							data-testid="loader"
							height={15}
						/>
					</div>
				) : questionState?.isSucceed ? (
					<Question question={questionState?.response[0]} />
				) : (
					<div className="h-48 flex items-center justify-center w-full">
						<ScaleLoader
							color="#fff"
							loading={questionState.isLoading}
							aria-label="Loading Spinner"
							data-testid="loader"
							height={15}
						/>
					</div>
				),
			},
		],
		[],
	);

	return (
		<div className="p-4 overflow-auto" style={{ height: 'calc(100vh - 81px)' }}>
			<div className="w-full flex flex-col justify-right items-start mt-4 gap-2 mb-6">
				<span className="text-3xl text-white text-right font-bold">
					امتیازگیری{' '}
				</span>

				<span className="text-xl text-[#5b5b5b] text-right font-bold">
					با تکمیل هر یک از وظایف
					<span className="text-[#fafafa]"> امتیاز دریافت کنید </span>
				</span>
			</div>
			<ScaleLoader
				color="#fff"
				loading={questionState.isLoading}
				aria-label="Loading Spinner"
				data-testid="loader"
				height={15}
			/>
			<Tab tabs={tabs} />
		</div>
	);
}
