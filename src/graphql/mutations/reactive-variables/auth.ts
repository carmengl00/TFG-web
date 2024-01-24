import { makeVar } from '@apollo/client';

export type AuthVar = {
  init: boolean;
  isRecovering?: boolean;
  tokens?: {
    accessToken?: string;
    refreshToken?: string;
  };
  isProfileCompleted?: boolean;
  isPasswordModified?: boolean;
};

export const authVar = makeVar<AuthVar>({
  init: false,
  isRecovering: false,
  tokens: undefined,
  isProfileCompleted: undefined,
  isPasswordModified: undefined,
});
