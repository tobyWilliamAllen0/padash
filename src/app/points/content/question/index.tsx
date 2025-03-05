import useFetch from '@/hooks/useFetch';
import CheckboxGroup from '@/components/CheckboxGroup';
import { setCookie, parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

export const Question = ({ question, onAnswer }: any) => {
	const [answer, setAnswer] = useState<number>();

	const [answerState, answerQuestion] = useFetch({
		onSuccess(res: any) {
			setCookie(
				null,
				'question',
				JSON.stringify({
					...JSON.parse(parseCookies()['question']),
					wasCorrect: res,
				}),
				{
					path: '/',
					sameSite: true,
				},
			);
		},
	});

	const handleGetSelectedValues = (value: string) => {
		onAnswer(
			question._id,
			question.options.findIndex((option: string) => option === value),
		);
		const answer = question.options.findIndex(
			(option: string) => option === value,
		);
		setAnswer(answer);
		setCookie(
			null,
			'question',
			JSON.stringify({
				id: question._id,
				answer: answer,
			}),
			{
				path: '/',
				sameSite: true,
			},
		);
		answerQuestion({
			url: 'earn/answer-question',
			method: 'POST',
			data: {
				questionId: question._id,
				answer: answer,
			},
		});
	};

	const questionJson = parseCookies()['question'];
	const questionFromCookies = questionJson ? JSON.parse(questionJson) : {};

	return (
		<div key={question._id}>
			<div className="mt-4">
				<span>{question.question}</span>
			</div>
			<div className="mt-4">
				{answerState.isLoading ? (
					<div className="h-48 flex items-center justify-center w-full">
						<ScaleLoader
							color="#fff"
							loading={answerState.isLoading}
							aria-label="Loading Spinner"
							data-testid="loader"
							height={15}
						/>
					</div>
				) : (
					<CheckboxGroup
						onChange={handleGetSelectedValues}
						options={question.options.map((option: string) => ({
							label: option,
							value: option,
						}))}
						wasCorrect={answerState?.response ?? null}
						yourAnswer={
							questionFromCookies.id === question?._id
								? questionFromCookies?.answer
								: null
						}
					/>
				)}
			</div>
		</div>
	);
};
