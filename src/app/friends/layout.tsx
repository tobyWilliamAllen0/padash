import type { Metadata } from 'next';
import BottomNavbar from '@/components/bottomNavbar';


export const metadata: Metadata = {
	title: 'Friends',
	description: 'Friends',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			{children}
			<BottomNavbar />
		</>
	);
}
