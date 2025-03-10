import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of paths that require authentication
const protectedPaths = ['/dashboard'];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if the path is protected
	const isProtectedPath = protectedPaths.some(
		(path) => pathname === path || pathname.startsWith(`${path}/`),
	);

	if (isProtectedPath) {
		// Check for auth token
		const authToken = request.cookies.get('auth_token')?.value;

		if (!authToken) {
			// Redirect to login if no token is found
			const loginUrl = new URL('/admin/dashboard/login', request.url);
			loginUrl.searchParams.set('from', pathname);
			return NextResponse.redirect(loginUrl);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 * - login and register pages
		 */
		'/((?!_next/static|_next/image|favicon.ico|public|login|register).*)',
	],
};
