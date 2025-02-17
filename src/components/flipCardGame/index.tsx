'use client';
import { useEffect, useState } from 'react';

type BoxStatus = 'hidden' | 'prize' | 'bomb';

export default function FlipCardGame() {
	const [boxes, setBoxes] = useState<BoxStatus[]>([]);
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [disableOtherBoxes, setDisableOtherBoxes] = useState<boolean>(false);
	const [score, setScore] = useState(0);
	const [faults, setFaults] = useState(0);
	const [flippingIndex, setFlippingIndex] = useState<number | null>(null);

	useEffect(() => {
		// Initialize game board with 4 prizes and 12 bombs in random positions
		const initialBoxes: BoxStatus[] = Array(16).fill('bomb');
		let prizeCount = 0;

		while (prizeCount < 4) {
			const randomIndex = Math.floor(Math.random() * 16);
			if (initialBoxes[randomIndex] === 'bomb') {
				initialBoxes[randomIndex] = 'prize';
				prizeCount++;
			}
		}

		setBoxes(initialBoxes.map(() => 'hidden'));
	}, []);

	const handleBoxClick = (index: number) => {
		if (gameOver || boxes[index] !== 'hidden') return;
		setDisableOtherBoxes(true);
		setFlippingIndex(index);

		setTimeout(() => {
			const newBoxes = [...boxes];
			const actualContent = getInitialBoxes()[index];
			newBoxes[index] = actualContent;

			if (actualContent === 'bomb') {
				setFaults((prev) => prev + 1);
				if (faults + 1 === 4) {
					setGameOver(true);
				}
			} else {
				setScore((prev) => prev + 1);
				if (score + 1 === 4) {
					setGameOver(true);
				}
			}

			setBoxes(newBoxes);
			setDisableOtherBoxes(false);

			setTimeout(() => setFlippingIndex(null), 2700);
		}, 1500);
	};

	const getInitialBoxes = () => {
		const initialBoxes: BoxStatus[] = Array(16).fill('bomb');
		let prizeCount = 0;
		while (prizeCount < 4) {
			const randomIndex = Math.floor(Math.random() * 16);
			if (initialBoxes[randomIndex] === 'bomb') {
				initialBoxes[randomIndex] = 'prize';
				prizeCount++;
			}
		}
		return initialBoxes;
	};

	return (
		<div className="min-h-screen p-8 pb-20">
			<div className="text-center mb-8">
				<h1 className="text-2xl font-bold text-white mb-2">امتیاز: {score}</h1>
				{gameOver && (
					<p className="text-xl text-white">
						{score === 4 ? 'برنده شدی! 🎉' : 'باختی! 💣'}
					</p>
				)}
			</div>

			<div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
				{boxes.map((status, index) => (
					<div
						key={index}
						onClick={() =>
							disableOtherBoxes ? () => {} : handleBoxClick(index)
						}
						className={`
                            aspect-square rounded-sm cursor-pointer
                            transform transition-all duration-300 perspective-1000
                            ${
															status === 'hidden'
																? 'bg-white hover:bg-gray-100'
																: ''
														}
                            ${status === 'prize' ? 'bg-green-500' : ''}
                            ${status === 'bomb' ? 'bg-red-500' : ''}
                        `}
						style={{
							zIndex: flippingIndex === index ? 20 : 10,
							position: 'relative',
							animation:
								flippingIndex === index
									? 'normalize 1s ease-in-out 1.5s, shake 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
									: 'none',
						}}
					/>
				))}
			</div>

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
