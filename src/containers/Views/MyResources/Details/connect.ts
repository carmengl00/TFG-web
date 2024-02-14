import { useResourceActions } from '@/graphql/hooks/myResources/useResourceActions';

export const useConnect = () => {
	const { createResource, isCreateLoading } = useResourceActions();

	return {
		createResource,
		isCreateLoading,
	};
};
