import { link as statusNotifierLink } from '@/graphql/statusNotifier';
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
	from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { PropsWithChildren } from 'react';

import { getTokens } from '../auth/utils';
import instrospection from '../generated/introspection';
import { typePolicies } from './typePolicies';

export const link = createHttpLink({
	uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
	credentials: 'include',
});

const authLink = setContext((request, { headers = {} }) => {
	const { accessToken } = getTokens() ?? {};

	// Don't include an authHeader if operation is `refreshToken`.
	// To prevent "Signature has expired" error, refreshToken need to be without Auth token
	const authHeader = accessToken ? { Authorization: `JWT ${accessToken}` } : {};

	return {
		headers: {
			...headers,
			...authHeader,
		},
	};
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
			typePolicies,
		}),
		link: from([statusNotifierLink, errorLink, authLink, link]),
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
