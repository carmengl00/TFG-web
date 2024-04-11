import { ApolloClientProvider } from '@/graphql/client/client';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import '../../app/globals.css';

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return getLayout(
		<ApolloClientProvider>
			<Component {...pageProps} />
		</ApolloClientProvider>
	);
}
