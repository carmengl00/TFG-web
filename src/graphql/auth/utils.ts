import Cookies, { CookieSetOptions } from 'universal-cookie';
import { ACCESS_TOKEN_EXPIRES, ACCESS_TOKEN_KEY, REFRESH_TOKEN_EXPIRES, REFRESH_TOKEN_KEY } from './constants';
import { AuthVar, authVar } from '../mutations/reactive-variables/auth';
import { StoreTokens } from './types';


const cookies = new Cookies();

export function updateAuthVar(updatedValues: Partial<AuthVar>) {
    authVar({ ...authVar(), ...updatedValues });
  }

const secureCookieOptions: CookieSetOptions = {
sameSite: 'strict',
path: '/',
secure: process.env.NODE_ENV !== 'development' ? true : undefined,
};

export function storeTokens({ accessToken, refreshToken }: StoreTokens) {
cookies.set(ACCESS_TOKEN_KEY, accessToken, {
    ...secureCookieOptions,
    expires: new Date(new Date().getTime() + ACCESS_TOKEN_EXPIRES),
});
if (!!refreshToken) {
    cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    ...secureCookieOptions,
    expires: new Date(new Date().getTime() + REFRESH_TOKEN_EXPIRES),
    });
}
}

export function resetTokens() {
cookies.remove(ACCESS_TOKEN_KEY, { path: '/' });
cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });

updateAuthVar({ init: true, tokens: undefined });
}
