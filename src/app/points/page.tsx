'use client';

import CheckboxGroup from '@/components/CheckboxGroup';
import FlipCardGame from '@/components/flipCardGame';
import Tab from '@/components/Tab';
import useFetch from '@/hooks/useFetch';
import { useEffect, useMemo, useRef } from 'react';

export default function Points() {
	const checkboxGroupRef = useRef<{ getSelectedValues: () => string[] }>(null);

	const [questionState, fetchQuestion] = useFetch();

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
				content: (
					<div>
						<div className="flex items-center justify-end gap-4">
							<span>زمان باقی مانده:</span>
							<span>48:00:00</span>
						</div>

						{questionState.response && (
							<>
								<div className="mt-4">
									<span>{questionState?.response[0].question}</span>
								</div>
								<div className="mt-4">
									<CheckboxGroup
										onChange={handleGetSelectedValues}
										options={questionState?.response[0].options.map(
											(option: string) => ({ label: option, value: option }),
										)}
									/>
								</div>
							</>
						)}
					</div>
				),
			},
		],
		[],
	);

	const handleGetSelectedValues = (value: string) => {
		console.log('Selected Values:', value);
	};

	useEffect(() => {
		fetchQuestion({
			url: 'admin/question',
			method: 'GET',
		});
	}, []);

	console.log(questionState, 'questionState');
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
			<Tab tabs={tabs} />
		</div>
	);
}
