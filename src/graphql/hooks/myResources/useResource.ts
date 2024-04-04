import {
	ResourceDocument,
	ResourceQuery,
	ResourceQueryVariables,
} from '@/graphql/generated/types';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect } from 'react';

export const useResource = ({ id }: { id: string }) => {
	const { data } = useQuery<ResourceQuery, ResourceQueryVariables>(
		ResourceDocument,
		{
			variables: {
				id: id,
			},
		}
	);

	const resource = data?.resource;

	return {
		resource,
	};
};
