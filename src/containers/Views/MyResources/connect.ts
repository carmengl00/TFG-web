import { PAGE_SIZE, POLL_INTERVAL } from '@/globals/constants';
import { useMyResources } from '@/graphql/hooks/myResources/useMyResources';
import { useMe } from '@/graphql/hooks/users/useMe';

export const useConnect = () => {
	const { me, isMeLoading } = useMe();

	const { isLoading, resources, loadMore } = useMyResources({
		pagination: {
			page: 1,
			pageSize: PAGE_SIZE,
		},
		pollInterval: POLL_INTERVAL,
	});

	return {
		me,
		isMeLoading,
		isLoading,
		resources,
		loadMore,
	};
};
