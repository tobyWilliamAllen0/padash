'use client';

import { useEffect, useState } from 'react';

export default function Home() {
	const [state, setState] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setState((prev) => prev + 1);
		}, 1000);
	}, []);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<span>Hash: {(window as any)?.Telegram?.WebApp.initData}</span>
			<span>State: {state}</span>
		</div>
	);
}
