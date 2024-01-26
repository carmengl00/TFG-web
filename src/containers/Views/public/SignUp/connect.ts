import { useAuthActions } from '@/graphql/auth/useAuthActions';
import { useMemo, useState } from 'react';

export const useConnect = () => {
	const { handleRegister, isRegisterLoading } = useAuthActions();

	return {
		handleRegister,
		isLoading: isRegisterLoading,
	};
};
