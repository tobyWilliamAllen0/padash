'use client';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import useFetch from '@/hooks/useFetch';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { Timer } from '../timer';

type BoxStatus = 'hidden' | 'prize' | 'bomb';

export default function FlipCardGame() {
	const [boxes, setBoxes] = useState<BoxStatus[]>([]);
	const [selectedBoxes, setSelectedBoxes] = useState<number[]>([]);
	const [flippingIndex, setFlippingIndex] = useState<number>();
	const [answers, setAnswers] = useState<{
		expiryTime: string | number | Date | any;
		answers: string[];
	}>({ expiryTime: null, answers: [] });

	const [answersState, fetchAnswers] = useFetch({
		onSuccess(res) {
			setAnswers(
				res as {
					expiryTime: string | number | Date;
					answers: string[];
				},
			);
			const response = res as {
				expiryTime: string | number | Date;
				answers: string[];
			};
			setBoxes(
				Array(16)
					.fill('hidden')
					.map((status, index) => {
						//@ts-ignore
						if (response.answers.includes(index)) {
							return 'prize';
						} else {
							return status;
						}
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
			setBoxes(
				Array(16)
					.fill('hidden')
					.map((status, index) => {
						if (index === selectedBoxes[-1]) {
							if (response?.is_correct) {
								return 'prize';
							} else {
								return 'bomb';
							}
						}

						return status;
					}),
			);
			// is_correct: false
			// score: 0
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
				.map((status, index) => {
					console.log(answers.answers, index);
					if (answers.answers.includes(index.toString())) {
						return 'prize';
					} else {
						return status;
					}
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
							<span className="text-xl ">امتیازات دریافت شده: ‌</span>
							<span>
								{Number(
									validateAnswerState?.response?.score ?? 0,
								).toLocaleString('fa-IR')}
							</span>
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
