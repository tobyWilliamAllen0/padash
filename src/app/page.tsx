'use client';
import { useEffect, useState } from 'react';

export default function Home() {
	const [hash, setHash] = useState('');
	const app =
		typeof window !== 'undefined' ? (window as any)?.Telegram?.WebApp : {};

	useEffect(() => {
		if (app) {
			setHash(app.initData);
		}
	}, [app]);

	const [state, setState] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setState((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<span>Hash: {hash}</span>
			<span>State: {state}</span>
			<span>App: {JSON.stringify(app)}</span>
		</div>
	);
}
