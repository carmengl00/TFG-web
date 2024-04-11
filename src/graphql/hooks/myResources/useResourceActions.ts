import {
	CreateResourceDocument,
	CreateResourceMutation,
	CreateResourceMutationVariables,
	DeleteResourceDocument,
	DeleteResourceMutation,
	DeleteResourceMutationVariables,
	MyResourcesDocument,
	UpdateResourceDocument,
	UpdateResourceMutation,
	UpdateResourceMutationVariables,
} from '@/graphql/generated/types';
import { ApolloError } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useCallback } from 'react';

export function useResourceActions() {
	const [performCreate, { loading: isCreateLoading }] = useMutation<
		CreateResourceMutation,
		CreateResourceMutationVariables
	>(CreateResourceDocument);

	const [performUpdate] = useMutation<
		UpdateResourceMutation,
		UpdateResourceMutationVariables
	>(UpdateResourceDocument);

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

	const updateResource = useCallback(
		async (input: UpdateResourceMutationVariables['input']) => {
			const raw = await performUpdate({
				variables: { input },
			});
			return raw.data?.updateResource;
		},
		[performUpdate]
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
		updateResource,
		deleteResource,
	};
}
