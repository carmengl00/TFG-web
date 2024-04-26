import {
	MyReservedSlotsDocument,
	MyReservedSlotsQuery,
	MyReservedSlotsQueryVariables,
	PaginationInput,
} from '@/graphql/generated/types';
import { FetchPolicy, useQuery } from '@apollo/client';
import { useMe } from '../users/useMe';

export const useMyReservedSlots = ({
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
	} = useQuery<MyReservedSlotsQuery, MyReservedSlotsQueryVariables>(
		MyReservedSlotsDocument,
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

	const myReservedSlots = data?.myReservedSlots.edges ?? [];

	const loadMore = async () => {
		if (data?.myReservedSlots.pageInfo?.hasNext) {
			await fetchMore({
				variables: {
					pagination: {
						page: data?.myReservedSlots.pageInfo.page + 1,
						pageSize: pagination?.pageSize,
					},
				},
			});
		}
	};

	return {
		isLoading: isLoading || isMeLoading,
		reservedSlots: {
			edges: myReservedSlots.filter(
				({ id }, index, self) =>
					index === self.findIndex(({ id: findId }) => findId === id)
			),
			pageInfo: data?.myReservedSlots.pageInfo,
		},
		loadMore: loadMore,
	};
};
