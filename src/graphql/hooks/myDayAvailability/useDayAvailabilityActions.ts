import {
	CreateOrUpdateAvailabilityDocument,
	CreateOrUpdateAvailabilityMutation,
	CreateOrUpdateAvailabilityMutationVariables,
	DeleteDayAvailabilityDocument,
	DeleteDayAvailabilityMutation,
	DeleteDayAvailabilityMutationVariables,
} from '@/graphql/generated/types';
import { ApolloError, useMutation } from '@apollo/client';
import { useCallback } from 'react';

export function useDayAvailabilityActions() {
	const [performCreateOrUpdateAvailability] = useMutation<
		CreateOrUpdateAvailabilityMutation,
		CreateOrUpdateAvailabilityMutationVariables
	>(CreateOrUpdateAvailabilityDocument);

	const [performDelete] = useMutation<
		DeleteDayAvailabilityMutation,
		DeleteDayAvailabilityMutationVariables
	>(DeleteDayAvailabilityDocument);

	const createOrUpdateAvailability = useCallback(
		async (variables: CreateOrUpdateAvailabilityMutationVariables) => {
			const raw = await performCreateOrUpdateAvailability({
				variables,
			});
			return raw.data?.createOrUpdateAvailability;
		},
		[performCreateOrUpdateAvailability]
	);

	const deleteDayAvailability = useCallback(
		async (id: DeleteDayAvailabilityMutationVariables['id']) => {
			try {
				const { data } = await performDelete({
					variables: { id },
				});
				if (data?.deleteDayAvailability) {
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
		createOrUpdateAvailability,
		deleteDayAvailability,
	};
}
