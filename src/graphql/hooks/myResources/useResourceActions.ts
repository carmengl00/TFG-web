import {
	CreateResourceDocument,
	CreateResourceMutation,
	CreateResourceMutationVariables,
	DeleteResourceDocument,
	DeleteResourceMutation,
	DeleteResourceMutationVariables,
	MyResourcesDocument,
} from '@/graphql/generated/types';
import { ApolloError } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useCallback } from 'react';

export function useResourceActions() {
	const [performCreate, { loading: isCreateLoading }] = useMutation<
		CreateResourceMutation,
		CreateResourceMutationVariables
	>(CreateResourceDocument);

	const [performDelete] = useMutation<
		DeleteResourceMutation,
		DeleteResourceMutationVariables
	>(DeleteResourceDocument);

	const createResource = useCallback(
		async (input: CreateResourceMutationVariables['input']) => {
			const raw = await performCreate({
				variables: { input },
			});
			return raw.data?.createResource;
		},
		[performCreate]
	);

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

	return {
		createResource,
		isCreateLoading,
		deleteResource,
	};
}
