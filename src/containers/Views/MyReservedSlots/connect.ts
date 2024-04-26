import { PAGE_SIZE, POLL_INTERVAL } from '@/globals/constants';
import { useMyResources } from '@/graphql/hooks/myResources/useMyResources';
import { useMyReservedSlots } from '@/graphql/hooks/slots/useMyReservedSlots';

export const useConnect = () => {
	const { resources } = useMyResources({
		pagination: {
			page: 1,
			pageSize: PAGE_SIZE,
		},
		pollInterval: POLL_INTERVAL,
	});

	const { reservedSlots, loadMore: loadMoreReservedSlots } = useMyReservedSlots(
		{
			pagination: {
				page: 1,
				pageSize: PAGE_SIZE,
			},
			pollInterval: POLL_INTERVAL,
		}
	);

	return {
		resources,
		reservedSlots,
		loadMoreReservedSlots,
	};
};
