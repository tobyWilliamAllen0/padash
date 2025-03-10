'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import Link from 'next/link';
import ScaleLoader from 'react-spinners/ScaleLoader';
import useFetch from '@/hooks/useFetch';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const [loginState, loginUser] = useFetch({
		onSuccess(res: any) {
			// Set authentication token
			setCookie(null, 'auth_token', res.token, {
				maxAge: 30 * 24 * 60 * 60, // 30 days
				path: '/',
				sameSite: true,
			});

			// Store user info if needed
			setCookie(null, 'user_info', JSON.stringify(res.user), {
				maxAge: 30 * 24 * 60 * 60,
				path: '/',
				sameSite: true,
			});

			// Redirect to dashboard
			router.push('/admin/dashboard');
		},
		onError(err: any) {
			setError(err.message || 'Login failed. Please try again.');
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (!username.trim() || !password.trim()) {
			setError('Username and password are required');
			return;
		}

		loginUser({
			url: 'admin/user/login',
			method: 'POST',
			data: {
				username,
				password,
			},
		});
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h1 className="text-center text-3xl font-extrabold text-gray-900">
					Padash
				</h1>
				<h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					{error && (
						<div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
							<p>{error}</p>
						</div>
					)}

					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium text-gray-700"
							>
								Username
							</label>
							<div className="mt-1">
								<input
									id="username"
									name="username"
									type="text"
									autoComplete="username"
									required
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<div className="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<label
									htmlFor="remember-me"
									className="ml-2 block text-sm text-gray-900"
								>
									Remember me
								</label>
							</div>

							<div className="text-sm">
								<a
									href="#"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Forgot your password?
								</a>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={loginState.isLoading}
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
							>
								{loginState.isLoading ? (
									<ScaleLoader
										color="#ffffff"
										loading={loginState.isLoading}
										aria-label="Loading Spinner"
										data-testid="loader"
										height={15}
									/>
								) : (
									'Sign in'
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
