import {
	UpdateUserDocument,
	UpdateUserMutation,
	UpdateUserMutationVariables,
} from '@/graphql/generated/types';
import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

export function useUsersActions() {
	const [performUpdate] = useMutation<
		UpdateUserMutation,
		UpdateUserMutationVariables
	>(UpdateUserDocument);

	const updateUser = useCallback(
		async (input: UpdateUserMutationVariables['input']) => {
			const raw = await performUpdate({
				variables: { input },
			});
			return raw.data?.updateUser;
		},
		[performUpdate]
	);

	return {
		updateUser,
	};
}
