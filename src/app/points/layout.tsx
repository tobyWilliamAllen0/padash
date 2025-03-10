import type { Metadata } from 'next';
import BottomNavbar from '@/components/bottomNavbar';


export const metadata: Metadata = {
	title: 'Points',
	description: 'Points',
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
