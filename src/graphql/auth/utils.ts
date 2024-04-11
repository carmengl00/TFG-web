import Cookies, { CookieSetOptions } from 'universal-cookie';
import { AuthVar, authVar } from '../mutations/reactive-variables/auth';
import {
	ACCESS_TOKEN_EXPIRES,
	ACCESS_TOKEN_KEY,
	REFRESH_TOKEN_EXPIRES,
	REFRESH_TOKEN_KEY,
} from './constants';
import { GetTokens, StoreTokens } from './types';

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
	if (!refreshToken) {
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

export function getTokens(): GetTokens {
	const { tokens } = authVar();
	let { accessToken, refreshToken } = tokens || {};
	if (!accessToken) {
		accessToken = cookies.get<string>(ACCESS_TOKEN_KEY);
	}
	if (!refreshToken) {
		refreshToken = cookies.get<string>(REFRESH_TOKEN_KEY);
	}
	updateAuthVar({ tokens: { accessToken, refreshToken } });

	return { accessToken, refreshToken };
}

export function getStoredTokens(): GetTokens {
	return {
		accessToken: cookies.get<string>(ACCESS_TOKEN_KEY),
		refreshToken: cookies.get<string>(REFRESH_TOKEN_KEY),
	};
}
