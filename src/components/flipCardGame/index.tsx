'use client';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import useFetch from '@/hooks/useFetch';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { Timer } from '../timer';

type BoxStatus = 'hidden' | 'prize' | 'bomb';

export default function FlipCardGame() {
	const [boxes, setBoxes] = useState<BoxStatus[]>([]);
	const [score, setScore] = useState<number>(0);
	const [selectedBoxes, setSelectedBoxes] = useState<number[]>([]);
	const [flippingIndex, setFlippingIndex] = useState<number>();
	const [answers, setAnswers] = useState<{
		expiryTime: string | number | Date | any;
		answers: {
			answer: number;
			is_correct: boolean;
		}[];
	}>({ expiryTime: null, answers: [] });

	const [answersState, fetchAnswers] = useFetch({
		onSuccess(res) {
			setAnswers(
				res as {
					expiryTime: string | number | Date;
					answers: {
						answer: number;
						is_correct: boolean;
					}[];
				},
			);
			const response = res as {
				expiryTime: string | number | Date;
				answers: {
					answer: number;
					is_correct: boolean;
				}[];
			};
			setBoxes(
				Array(16)
					.fill('hidden')
					.map((_, index) => {
						// Find the matching answer for this index, if any
						const matchedAnswer = response.answers.find(
							(res) => res.answer === index,
						);

						// Return the appropriate status based on whether we found a match
						if (matchedAnswer) {
							if (matchedAnswer.is_correct) {
								setScore((prev) => prev + 250);
							}
							return matchedAnswer.is_correct ? 'prize' : 'bomb';
						}

						// No match found, keep as hidden
						return 'hidden';
					}),
			);
		},
	});

	const [validateAnswerState, validateAnswer] = useFetch({
		onSuccess(res) {
			const response = res as {
				is_correct: boolean;
				score: number;
			};
			const lastSelectedIndex = selectedBoxes[-1];
			console.log(lastSelectedIndex, 'lastSelectedIndex')
			console.log(response, 'response')
			setBoxes((prevBoxes) =>
				prevBoxes.map((status, index) =>
					index === lastSelectedIndex
						? response?.is_correct
							? 'prize'
							: 'bomb'
						: status,
				),
			);
			setScore((prev) => prev + response.score);
		},
	});

	useEffect(() => {
		fetchAnswers({
			url: 'earn/puzzle-user-answers',
			method: 'GET',
		});
		setBoxes(
			Array(16)
				.fill('hidden')
				.map((_, index) => {
					// Find the matching answer for this index, if any
					const matchedAnswer = answers.answers.find(
						(res) => res.answer === index,
					);

					// Return the appropriate status based on whether we found a match
					if (matchedAnswer) {
						return matchedAnswer.is_correct ? 'prize' : 'bomb';
					}

					// No match found, keep as hidden
					return 'hidden';
				}),
		);
		setSelectedBoxes([]);
	}, []);

	const handleBoxClick = (index: number) => {
		// Prevent clicking if game is over, box already revealed, or already selected 4 boxes
		if (selectedBoxes.length >= 4 || selectedBoxes.includes(index)) return;

		// Add this box to selected boxes
		setSelectedBoxes((selectedBoxes) => [...selectedBoxes, index]);

		validateAnswer({
			url: `/earn/answer-puzzle/${index}`,
			method: 'PUT',
		});
		setFlippingIndex(index);
	};
	console.log(boxes, 'boxes');
	return (
		<div className="min-h-screen p-2 pb-20">
			{answersState.isLoading ? (
				<div className="h-48 flex items-center justify-center w-full">
					<ScaleLoader
						color="#fff"
						loading={answersState.isLoading}
						aria-label="Loading Spinner"
						data-testid="loader"
						height={15}
					/>
				</div>
			) : (
				<>
					<div className="flex flex-row items-center justify-between mb-4">
						<div>
							<span className="text-base ">امتیازات دریافت شده: ‌</span>
							<span>{Number(score).toLocaleString('fa-IR')}</span>
						</div>
						<Timer expireTime={answers?.expiryTime} />
					</div>
					<div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
						{boxes.map((status, index) => (
							<div
								key={index}
								onClick={() => handleBoxClick(index)}
								className={`
									aspect-square rounded-sm cursor-pointer flex items-center justify-center
									transform transition-all duration-300 perspective-1000
									${status === 'hidden' ? 'bg-white hover:bg-gray-100' : ''}
									${status === 'bomb' ? 'bg-red-500' : ''}
									${status === 'prize' ? 'bg-white' : ''}

								`}
								style={{
									zIndex: flippingIndex === index ? 20 : 10,
									position: 'relative',
									animation:
										flippingIndex === index
											? 'normalize 0.5s ease-in-out 0.5s, shake 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
											: 'none',
								}}
							>
								<Image
									src="/assets/images/logo.png"
									alt="Logo"
									width={109}
									height={109}
									style={{ aspectRatio: '1/1' }}
									className={status === 'prize' ? 'flex' : 'hidden'}
								/>
							</div>
						))}
					</div>
				</>
			)}

			<style jsx global>{`
				@keyframes normalize {
					0% {
						transform: translate(0) scale(1.3);
					}
					100% {
						transform: translate(0) scale(1);
					}
				}
				@keyframes shake {
					0% {
						transform: translate(0) scale(1);
					}
					10% {
						transform: translate(-2px, 2px) scale(1.01);
					}
					20% {
						transform: translate(2px, -2px) scale(1.02);
					}
					30% {
						transform: translate(-2px, -2px) scale(1.03);
					}
					40% {
						transform: translate(2px, 2px) scale(1.04);
					}

					45% {
						transform: translate(-2px, 2px) scale(1.04);
					}
					50% {
						transform: translate(2px, -2px) scale(1.05);
					}
					55% {
						transform: translate(-2px, -2px) scale(1.05);
					}
					60% {
						transform: translate(2px, 2px) scale(1.06);
					}

					65% {
						transform: translate(-2px, 2px) scale(1.06);
					}
					67% {
						transform: translate(2px, -2px) scale(1.06);
					}
					69% {
						transform: translate(-2px, -2px) scale(1.06);
					}
					72% {
						transform: translate(2px, 2px) scale(1.06);
					}

					75% {
						transform: translate(-2px, 2px) scale(1.06);
					}
					77% {
						transform: translate(2px, -2px) scale(1.06);
					}
					79% {
						transform: translate(-2px, -2px) scale(1.06);
					}
					82% {
						transform: translate(2px, 2px) scale(1.06);
					}

					83% {
						transform: translate(-2px, 2px) scale(1.06);
					}
					84% {
						transform: translate(2px, -2px) scale(1.06);
					}
					85% {
						transform: translate(-2px, -2px) scale(1.07);
					}
					86% {
						transform: translate(2px, 2px) scale(1.08);
					}

					87% {
						transform: translate(-2px, 2px) scale(1.09);
					}
					88% {
						transform: translate(2px, -2px) scale(1.1);
					}
					89% {
						transform: translate(-2px, -2px) scale(1.11);
					}
					90% {
						transform: translate(2px, 2px) scale(1.12);
					}

					91% {
						transform: translate(-2px, 2px) scale(1.13);
					}
					92% {
						transform: translate(2px, -2px) scale(1.14);
					}
					93% {
						transform: translate(-2px, -2px) scale(1.15);
					}
					94% {
						transform: translate(2px, 2px) scale(1.16);
					}

					95% {
						transform: translate(-2px, 2px) scale(1.17);
					}
					96% {
						transform: translate(2px, -2px) scale(1.18);
					}
					97% {
						transform: translate(-2px, -2px) scale(1.19);
					}
					98% {
						transform: translate(2px, 2px) scale(1.2);
					}

					100% {
						transform: translate(0) scale(1.3);
					}
				}

				.perspective-1000 {
					perspective: 1000px;
				}
			`}</style>
		</div>
	);
}
