import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<Script src="https://telegram.org/js/telegram-web-app.js?56" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				style={{ background: 'linear-gradient(0deg, #0a0a0a, #16140c)' }}
				dir="rtl"
			>
				<AntdRegistry>{children}</AntdRegistry>
			</body>
		</html>
	);
}
