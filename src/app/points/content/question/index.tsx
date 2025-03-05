import dayjs from 'dayjs';
import { useTimer } from 'react-timer-hook';
import duration from 'dayjs/plugin/duration';
import { useEffect, useMemo } from 'react';
import useFetch from '@/hooks/useFetch';
import CheckboxGroup from '@/components/CheckboxGroup';

dayjs.extend(duration);

export const Question = ({ question }: any) => {
	const EXPIRY_TIMESTAMP = useMemo(() => {
		const EXPIRY_TIMESTAMP = new Date(question.active_time);

		return EXPIRY_TIMESTAMP;
	}, [question]);

	const { seconds, isRunning, pause, minutes, hours } = useTimer({
		expiryTimestamp: EXPIRY_TIMESTAMP,
		onExpire: () => pause(),
	});

	const handleGetSelectedValues = (value: string) => {
		console.log('Selected Values:', value);
	};

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

			<div className="mt-4">
				<span>{question.question}</span>
			</div>
			<div className="mt-4">
				<CheckboxGroup
					onChange={handleGetSelectedValues}
					options={question.options.map((option: string) => ({
						label: option,
						value: option,
					}))}
				/>
			</div>
		</div>
	);
};
