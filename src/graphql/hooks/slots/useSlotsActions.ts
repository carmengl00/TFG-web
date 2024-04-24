import {
	CreateReservedSlotDocument,
	CreateReservedSlotMutation,
	CreateReservedSlotMutationVariables,
} from '@/graphql/generated/types';
import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

export function useSlotsActions() {
	const [performCreate, { loading: isCreateLoading }] = useMutation<
		CreateReservedSlotMutation,
		CreateReservedSlotMutationVariables
	>(CreateReservedSlotDocument);

	const createReservedSlot = useCallback(
		async (input: CreateReservedSlotMutationVariables['input']) => {
			const raw = await performCreate({
				variables: { input },
			});
			return raw.data?.createReservedSlot;
		},
		[performCreate]
	);

	return {
		createReservedSlot,
		isCreateLoading,
	};
}
