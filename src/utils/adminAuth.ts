'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function useAdminAuth() {
	const router = useRouter();
	const pathname = usePathname();
	const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

	useEffect(() => {
		// Skip protection for the login page itself
		if (pathname === '/admin/login') {
			setIsAuthorized(true);
			return;
		}

		// Check for auth token
		const token =
			localStorage.getItem('adminToken') ||
			sessionStorage.getItem('adminToken');

		if (!token) {
			console.log('No admin token found, redirecting to login');
			router.push('/admin/login');
			setIsAuthorized(false);
		} else {
			// Optionally verify token validity here if needed
			// For example, check expiration or make an API call to validate
			setIsAuthorized(true);
		}
	}, [router, pathname]);

	return { isAuthorized };
}
