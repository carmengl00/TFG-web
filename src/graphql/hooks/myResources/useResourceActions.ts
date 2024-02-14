import {
	DeleteResourceDocument,
	DeleteResourceMutation,
	DeleteResourceMutationVariables,
	MyResourcesDocument,
} from '@/graphql/generated/types';
import { ApolloError, useMutation } from '@apollo/client';
import { useCallback } from 'react';

export function useResourceActions() {
	const [performDelete] = useMutation<
		DeleteResourceMutation,
		DeleteResourceMutationVariables
	>(DeleteResourceDocument);

	const deleteResource = useCallback(
		async (id: DeleteResourceMutationVariables['id']) => {
			try {
				const { data } = await performDelete({
					variables: { id },
					refetchQueries: [MyResourcesDocument],
				});
				if (data?.deleteResource) {
					return true;
				}
			} catch (e) {
				if (e instanceof ApolloError) {
					throw e;
				}
			}
		},
		[performDelete]
	);

	return deleteResource;
}
