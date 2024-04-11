export type GraphqlMessageError = {
	message: string;
};

export function isGraphqlMessageError(
	error: unknown
): error is GraphqlMessageError {
	return !!(<GraphqlMessageError>error).message;
}
