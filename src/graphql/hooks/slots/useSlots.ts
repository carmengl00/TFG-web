import {
	GetSlotsDocument,
	GetSlotsQuery,
	GetSlotsQueryVariables,
} from '@/graphql/generated/types';
import { useLazyQuery } from '@apollo/client';

export const useSlots = () => {
	const [getSlots] = useLazyQuery<GetSlotsQuery, GetSlotsQueryVariables>(
		GetSlotsDocument
	);

	return {
		getSlots,
	};
};
