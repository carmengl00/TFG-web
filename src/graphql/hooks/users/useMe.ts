import {
	GetMeDocument,
	GetMeQuery,
	GetMeQueryVariables,
} from '@/graphql/generated/types';
import { startCase } from '@/utils/formatString';
import { useQuery } from '@apollo/client';

export function normalizeMe(data?: GetMeQuery) {
	return {
		email: data?.me.email,
		id: data?.me.id,
		firstName: startCase(data?.me.firstName),
		lastName: startCase(data?.me.lastName),
		fullName: startCase(
			`${data?.me.firstName || ''} ${data?.me.lastName || ''}`
		),
	};
}

export const useMe = (options?: { skip?: boolean }) => {
	const { data, loading } = useQuery<GetMeQuery, GetMeQueryVariables>(
		GetMeDocument,
		{
			skip: !!options?.skip,
			initialFetchPolicy: 'cache-first',
			nextFetchPolicy: 'cache-only',
		}
	);

	return {
		me: normalizeMe(data),
		isMeLoading: loading,
	};
};

export type Me = ReturnType<typeof normalizeMe>;
