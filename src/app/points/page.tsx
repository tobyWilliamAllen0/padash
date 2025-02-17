'use client';

import FlipCardGame from '@/components/flipCardGame';

export default function Points() {
	return (
		<div className="p-4 overflow-hidden">
			<div className="w-[100%] h-[150px] border-dashed border-2 border-red-500 mt-2 flex items-center justify-center text-4xl">
				350 * 150
			</div>
			<div className="w-full flex justify-center items-center mt-2">
				<span className="text-lg text-white text-center font-bold px-10">
					LeaderBoard
				</span>
			</div>
			<FlipCardGame />
		</div>
	);
}
