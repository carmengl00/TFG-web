import {
	CreateReservedSlotDocument,
	CreateReservedSlotMutation,
	CreateReservedSlotMutationVariables,
	DeleteReservedSlotDocument,
	DeleteReservedSlotMutation,
	DeleteReservedSlotMutationVariables,
} from '@/graphql/generated/types';
import { ApolloError, useMutation } from '@apollo/client';
import { useCallback } from 'react';

export function useSlotsActions() {
	const [performCreate, { loading: isCreateLoading }] = useMutation<
		CreateReservedSlotMutation,
		CreateReservedSlotMutationVariables
	>(CreateReservedSlotDocument);

	const [performDelete] = useMutation<
		DeleteReservedSlotMutation,
		DeleteReservedSlotMutationVariables
	>(DeleteReservedSlotDocument);

	const createReservedSlot = useCallback(
		async (input: CreateReservedSlotMutationVariables['input']) => {
			const raw = await performCreate({
				variables: { input },
			});
			return raw.data?.createReservedSlot;
		},
		[performCreate]
	);

	const deleteReservedSlot = useCallback(
		async (id: DeleteReservedSlotMutationVariables['id']) => {
			try {
				const { data } = await performDelete({
					variables: { id },
					refetchQueries: [DeleteReservedSlotDocument],
				});
				if (data?.deleteReservedSlot) {
					window.location.reload();
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
		createReservedSlot,
		isCreateLoading,
		deleteReservedSlot,
	};
}
