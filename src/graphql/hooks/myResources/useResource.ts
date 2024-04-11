import {
	ResourceDocument,
	ResourceQuery,
	ResourceQueryVariables,
} from '@/graphql/generated/types';
import { useQuery } from '@apollo/client';

export const useResource = ({ id }: { id?: string | string[] }) => {
	const { data, loading: isResourceLoading } = useQuery<
		ResourceQuery,
		ResourceQueryVariables
	>(ResourceDocument, {
		variables: {
			id: String(id),
		},
		skip: (!!id && typeof id !== 'string') || !id,
	});

	const resource = data?.resource;

	return {
		resource,
		isResourceLoading,
	};
};
