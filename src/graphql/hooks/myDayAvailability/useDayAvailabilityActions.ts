import {
	CreateDayAvailabilityDocument,
	CreateDayAvailabilityMutation,
	CreateDayAvailabilityMutationVariables,
} from '@/graphql/generated/types';
import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

export function useDayAvailabilityActions() {
	const [performCreate, { loading: isCreateLoading }] = useMutation<
		CreateDayAvailabilityMutation,
		CreateDayAvailabilityMutationVariables
	>(CreateDayAvailabilityDocument);

	const createDayAvailability = useCallback(
		async (variables: CreateDayAvailabilityMutationVariables) => {
			const raw = await performCreate({
				variables,
			});
			return raw.data?.createDayAvailability;
		},
		[performCreate]
	);

	return {
		createDayAvailability,
	};
}
