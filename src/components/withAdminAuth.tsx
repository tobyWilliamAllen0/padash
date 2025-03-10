'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';
import { parseCookies } from 'nookies';

export default function withAdminAuth<P extends object>(
	Component: React.ComponentType<P>,
) {
	return function ProtectedRoute(props: P) {
		const router = useRouter();
		const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
		const authToken = parseCookies()['auth_token'];
		useEffect(() => {
			if (!authToken) {
				router.push('/admin/login');
				setIsAuthorized(false);
			} else {
				setIsAuthorized(true);
			}
		}, [router]);

		if (isAuthorized === null) {
			return (
				<div className="flex h-screen items-center justify-center">
					<Spin size="large" tip="Loading..." />
				</div>
			);
		}

		if (isAuthorized === false) {
			return null;
		}

		return <Component {...props} />;
	};
}
