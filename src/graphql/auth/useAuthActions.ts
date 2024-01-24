import { ApolloError, useMutation } from '@apollo/client';
import { useCallback } from 'react';

import { RegisterDocument, RegisterMutation, RegisterMutationVariables } from '../generated';
import { LoginDocument, LoginMutation, LoginMutationVariables } from '../generated/types';
import { resetTokens, storeTokens, updateAuthVar } from './utils';

export const useAuthActions = () => {

  const [performRegister, { loading: isRegisterLoading }] =
    useMutation<RegisterMutation, RegisterMutationVariables>(
      RegisterDocument,
    );

    const [performLogin, { loading: isLoginLoading }] = 
    useMutation<LoginMutation, LoginMutationVariables>(
      LoginDocument,
    );

  const handleRegister = useCallback(
    async (input: RegisterMutationVariables['input']) => {
      const raw = await performRegister({
        variables: { input },
      });

      return raw.data?.register;
    },
    [performRegister]
  );

  const handleLogin = useCallback(
    async (input: LoginMutationVariables['input']) => {
      try {
        const { data } = await performLogin({
          variables: { input },
        });
        resetTokens();

        if (data?.login?.refreshToken && data?.login?.token) {
          const tokens = {
            accessToken: data.login.token,
            refreshToken: data.login.refreshToken,
          };
          storeTokens(tokens);
          updateAuthVar({
            tokens,
            init: true,
          });

          return data?.login;
        }
      } catch (e) {
        console.error('Error during login:', e);
        if (e instanceof ApolloError) {
          throw e;
        }
      }
    },
    [performLogin],
  );

  return {
    handleRegister,
    isRegisterLoading,
    handleLogin,
    isLoginLoading
  };
};
