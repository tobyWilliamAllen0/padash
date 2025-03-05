'use client';

import CheckboxGroup from '@/components/CheckboxGroup';
import FlipCardGame from '@/components/flipCardGame';
import Tab from '@/components/Tab';
import useFetch from '@/hooks/useFetch';
import { useEffect, useMemo, useRef } from 'react';

export default function Points() {
	const checkboxGroupRef = useRef<{ getSelectedValues: () => string[] }>(null);

	const [questionState, fetchQuestion] = useFetch();

	const options = [
		{ label: 'Option 1', value: 'option1' },
		{ label: 'Option 2', value: 'option2' },
		{ label: 'Option 3', value: 'option3' },
	];

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
						<div className="mt-4">
							<span>
								صندوق بخشی گروه مالی پاداش با نماد رو در کدام صنعت عمدتا سرمایه
								گذاری می » پاداش کند؟ صنعت شیمیایی صنعت سیمان صنعت دارو صنعت
								خودرو
							</span>
						</div>
						<div className="mt-4">
							<CheckboxGroup ref={checkboxGroupRef} options={options} />
						</div>
					</div>
				),
			},
		],
		[],
	);

	const handleGetSelectedValues = () => {
		if (checkboxGroupRef.current) {
			const selectedValues = checkboxGroupRef.current.getSelectedValues();
			console.log('Selected Values:', selectedValues);
		}
	};

	useEffect(() => {
		fetchQuestion({
			url: "admin/question",
			method: "GET"
		})
	}, [])

	console.log(questionState, 'questionState')
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
