import { link as statusNotifierLink } from '@/graphql/statusNotifier';
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
	from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { PropsWithChildren } from 'react';

import instrospection from './generated/introspection';

export const link = createHttpLink({
	uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
	credentials: 'include',
});

export default function setupClient() {
	const errorLink = onError(({ graphQLErrors }) => {
		if (graphQLErrors) {
			for (const err of graphQLErrors) {
				console.error(err.message);
			}
		}
	});

	return new ApolloClient({
		cache: new InMemoryCache({
			possibleTypes: instrospection.possibleTypes,
		}),
		link: from([statusNotifierLink, errorLink, link]),
		defaultOptions: {
			watchQuery: {
				errorPolicy: 'all',
			},
		},
	});
}

export const client = setupClient();

export function ApolloClientProvider({ children }: PropsWithChildren<unknown>) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
