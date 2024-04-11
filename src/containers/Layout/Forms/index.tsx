import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="h-screen flex flex-col items-center justify-center max-w-md mx-auto">
			{children}
		</main>
	);
}
