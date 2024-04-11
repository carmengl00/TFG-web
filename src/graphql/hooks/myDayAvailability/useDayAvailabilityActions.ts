import {
	CreateOrUpdateAvailabilityDocument,
	CreateOrUpdateAvailabilityMutation,
	CreateOrUpdateAvailabilityMutationVariables,
	DeleteAllAvailabilitiesDocument,
	DeleteAllAvailabilitiesMutation,
	DeleteAllAvailabilitiesMutationVariables,
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

	const [performDeleteAll] = useMutation<
		DeleteAllAvailabilitiesMutation,
		DeleteAllAvailabilitiesMutationVariables
	>(DeleteAllAvailabilitiesDocument);

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

	const deleteAllAvailabilities = useCallback(
		async (
			resourceId: DeleteAllAvailabilitiesMutationVariables['resourceId']
		) => {
			try {
				const { data } = await performDeleteAll({
					variables: { resourceId },
				});
				if (data?.deleteAllAvailabilities) {
					return true;
				}
			} catch (e) {
				if (e instanceof ApolloError) {
					throw e;
				}
			}
		},
		[performDeleteAll]
	);

	return {
		createOrUpdateAvailability,
		deleteDayAvailability,
		deleteAllAvailabilities,
	};
}
