import { link as statusNotifierLink } from '@/graphql/statusNotifier';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { PropsWithChildren } from 'react';

import instrospection from './generated/introspection';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const link = createHttpLink({
  uri: process.env['NEXT_PUBLIC_GRAPHQL_ENDPOINT'],
  credentials: 'include',
});

export default function setupClient() {
  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // eslint-disable-next-line no-console
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
