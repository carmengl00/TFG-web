export type StoreTokens = {
	accessToken: string;
	refreshToken?: string;
};
export type GetTokens = {
	accessToken: string | null;
	refreshToken: string | null;
};
