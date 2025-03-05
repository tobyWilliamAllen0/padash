import dayjs from 'dayjs';
import { useTimer } from 'react-timer-hook';
import duration from 'dayjs/plugin/duration';
import { useEffect, useMemo } from 'react';
import useFetch from '@/hooks/useFetch';
import CheckboxGroup from '@/components/CheckboxGroup';

dayjs.extend(duration);

const getDateNow = () => new Date('2025-03-25T20:04:53.718Z');

export const Question = () => {
	const [questionState, fetchQuestion] = useFetch();

	const EXPIRY_TIMESTAMP = useMemo(() => {
		const EXPIRY_TIMESTAMP = questionState?.response
			? new Date(questionState?.response[0].active_time)
			: getDateNow();

		return EXPIRY_TIMESTAMP;
	}, [questionState?.response]);

	const { seconds, isRunning, pause, minutes, hours } = useTimer({
		expiryTimestamp: questionState?.response
			? questionState?.response[0].active_time
			: EXPIRY_TIMESTAMP,
		onExpire: () => pause(),
	});

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
		<div>
			{isRunning && (
				<div className="flex items-center justify-end gap-4">
					<span>زمان باقی مانده:</span>
					<span>
						{' '}
						{dayjs
							.duration({
								seconds,
								minutes,
								hours,
							})
							.format('HH[:]mm[:]ss')}
					</span>
				</div>
			)}

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
	);
};
