import {
	CreateReservedSlotDocument,
	CreateReservedSlotMutation,
	CreateReservedSlotMutationVariables,
	DeleteReservedSlotDocument,
	DeleteReservedSlotMutation,
	DeleteReservedSlotMutationVariables,
	SendEmailDeleteSlotDocument,
	SendEmailDeleteSlotMutation,
	SendEmailDeleteSlotMutationVariables,
	SendEmailToReservedSlotUserDocument,
	SendEmailToReservedSlotUserMutation,
	SendEmailToReservedSlotUserMutationVariables,
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

	const [performSendEmail] = useMutation<
		SendEmailToReservedSlotUserMutation,
		SendEmailToReservedSlotUserMutationVariables
	>(SendEmailToReservedSlotUserDocument);

	const [performSendEmailDeletedSlot] = useMutation<
		SendEmailDeleteSlotMutation,
		SendEmailDeleteSlotMutationVariables
	>(SendEmailDeleteSlotDocument);

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

	const sendEmailToReservedSlotUser = useCallback(
		async (input: SendEmailToReservedSlotUserMutationVariables['input']) => {
			const raw = await performSendEmail({
				variables: { input },
			});
			return raw.data?.sendEmailToReservedSlotUser;
		},
		[performSendEmail]
	);

	const sendEmailDeleteSlot = useCallback(
		async (input: SendEmailDeleteSlotMutationVariables['input']) => {
			const raw = await performSendEmailDeletedSlot({
				variables: { input },
			});
			return raw.data?.sendEmailDeleteSlot;
		},
		[performSendEmailDeletedSlot]
	);

	return {
		createReservedSlot,
		isCreateLoading,
		deleteReservedSlot,
		sendEmailToReservedSlotUser,
		sendEmailDeleteSlot,
	};
}
