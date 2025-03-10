'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function RefCodeReader({
	setRefCode,
}: {
	setRefCode: (code: string | null) => void;
}) {
	const searchParams = useSearchParams();

	useEffect(() => {
		// Check for startApp parameter (case sensitive)
		let code = searchParams.get('startApp');

		// If not found, check for startapp parameter (lowercase)
		if (!code) {
			code = searchParams.get('startapp');
		}

		if (code) {
			setRefCode(code);
			localStorage.setItem('referralCode', code);
			console.log('Referral code found:', code);
		}
	}, [searchParams, setRefCode]);

	return null;
}
