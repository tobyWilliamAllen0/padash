import { useTimer } from 'react-timer-hook';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const Timer = ({
	expireTime,
}: {
	expireTime: string | number | Date;
}) => {
	const EXPIRY_TIMESTAMP = new Date(expireTime ?? null);

	const { seconds, isRunning, pause, minutes, hours } = useTimer({
		expiryTimestamp: EXPIRY_TIMESTAMP,
		onExpire: () => pause(),
	});

	return (
		<div className="flex items-center justify-end gap-4 mb-6">
			<span>زمان باقی مانده:</span>
			<span>
				{dayjs
					.duration({
						seconds,
						minutes,
						hours,
					})
					.format('HH[:]mm[:]ss')}
			</span>
		</div>
	);
};
