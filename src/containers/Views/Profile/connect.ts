import { PAGE_SIZE, POLL_INTERVAL } from '@/globals/constants';
import { useMyResources } from '@/graphql/hooks/myResources/useMyResources';
import { useMyReservedSlots } from '@/graphql/hooks/slots/useMyReservedSlots';
import { useMe } from '@/graphql/hooks/users/useMe';

export const useConnect = () => {
	const { me } = useMe();

	const { resources } = useMyResources({
		pagination: {
			page: 1,
			pageSize: PAGE_SIZE,
		},
		pollInterval: POLL_INTERVAL,
	});

	const { reservedSlots } = useMyReservedSlots({
		pagination: {
			page: 1,
			pageSize: PAGE_SIZE,
		},
		pollInterval: POLL_INTERVAL,
	});

	return {
		me,
		resources,
		reservedSlots,
	};
};
