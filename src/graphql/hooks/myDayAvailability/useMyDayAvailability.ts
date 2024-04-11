import {
	MyDailyAvailabilityDocument,
	MyDailyAvailabilityQuery,
	MyDailyAvailabilityQueryVariables,
} from '@/graphql/generated/types';
import { useLazyQuery } from '@apollo/client';

export const useMyDayAvailability = () => {
	const [getDaysAvailabilities] = useLazyQuery<
		MyDailyAvailabilityQuery,
		MyDailyAvailabilityQueryVariables
	>(MyDailyAvailabilityDocument);

	return {
		getDaysAvailabilities,
	};
};
