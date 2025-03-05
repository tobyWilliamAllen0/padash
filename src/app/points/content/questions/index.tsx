import { useMemo, useState } from 'react';
import { Question } from '../question';
import { useTimer } from 'react-timer-hook';
import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';
import useFetch from '@/hooks/useFetch';
dayjs.extend(duration);

export const Questions = ({ questions }: { questions: any }) => {
	const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
	const [answerState, answerQuestion] = useFetch();

	const questionToShow =
		answeredQuestions.length !== questions.length
			? questions.filter(
					(question: any) => !answeredQuestions.includes(question._id),
			  )[0]
			: questions[questions.length - 1];

	const EXPIRY_TIMESTAMP = useMemo(() => {
		const EXPIRY_TIMESTAMP = new Date(questionToShow?.active_time ?? null);

		return EXPIRY_TIMESTAMP;
	}, [questionToShow]);

	const { seconds, isRunning, pause, minutes, hours } = useTimer({
		expiryTimestamp: EXPIRY_TIMESTAMP,
		onExpire: () => pause(),
	});

	return (
		<div>
			<div className="flex flex-row items-center justify-between gap-4">
				<div className="flex flex-row items-center justify-start gap-4">
					<span>سوال</span>
					<span className="text-xl ">{answeredQuestions.length + 1} </span>
					<span>از</span>
					<span className="text-xl ">{questions.length} </span>
				</div>
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
			</div>

			<Question
				question={questionToShow}
				onAnswer={(value: string, answer: number) => {
					setAnsweredQuestions((prev) => [...prev, value]);
					answerQuestion({
						url: 'earn/answer-question',
						method: 'POST',
						data: {
							questionId: value,
							answer: answer,
						},
					});
				}}
			/>
		</div>
	);
};
