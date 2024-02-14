import {
	DeleteResourceDocument,
	DeleteResourceMutation,
	MyResourcesDocument,
	MyResourcesQuery,
	MyResourcesQueryVariables,
	PaginationInput,
} from '@/graphql/generated/types';
import { DeleteResourceMutationVariables } from '@/graphql/generated/types';
import {
	ApolloError,
	FetchPolicy,
	useMutation,
	useQuery,
} from '@apollo/client';
import { useCallback } from 'react';
import { useMe } from '../users/useMe';

export const useMyResources = ({
	pagination,
	fetchPolicy,
	pollInterval = undefined,
}: {
	pagination?: PaginationInput;
	fetchPolicy?: FetchPolicy;
	pollInterval?: number;
}) => {
	const { isMeLoading } = useMe();

	const {
		data,
		loading: isLoading,
		fetchMore,
	} = useQuery<MyResourcesQuery, MyResourcesQueryVariables>(
		MyResourcesDocument,
		{
			variables: {
				pagination: {
					...pagination,
				},
			},
			fetchPolicy: fetchPolicy ?? 'cache-and-network',
			pollInterval,
		}
	);

	const resources = data?.myResources.edges ?? [];

	const loadMore = async () => {
		if (data?.myResources.pageInfo?.hasNext) {
			await fetchMore({
				variables: {
					pagination: {
						page: data?.myResources.pageInfo.page + 1,
						pageSize: pagination?.pageSize,
					},
				},
			});
		}
	};

	return {
		isLoading: isLoading || isMeLoading,
		resources: {
			edges: resources.filter(
				({ id }, index, self) =>
					index === self.findIndex(({ id: findId }) => findId === id)
			),
			pageInfo: data?.myResources.pageInfo,
		},
		loadMore: loadMore,
	};
};
