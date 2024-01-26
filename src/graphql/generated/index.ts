import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
	  };
const defaultOptions = {} as const;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	DateTime: { input: string; output: string };
	UUID: { input: string; output: string };
};

export type ChangePasswordInput = {
	currentPassword: Scalars['String']['input'];
	password: Scalars['String']['input'];
	repeatPassword?: InputMaybe<Scalars['String']['input']>;
};

export type GetUploadUrlInput = {
	contentType: Scalars['String']['input'];
	filename: Scalars['String']['input'];
	private: Scalars['Boolean']['input'];
};

export type LoginInput = {
	email: Scalars['String']['input'];
	password: Scalars['String']['input'];
};

export type MediaUploadUrlType = {
	contentType: Scalars['String']['output'];
	retrieveUrl: Scalars['String']['output'];
	uploadUrl: Scalars['String']['output'];
};

export type Mutation = {
	changePassword: Scalars['Boolean']['output'];
	getUploadUrl: MediaUploadUrlType;
	login: UserTypeWeb;
	register: UserType;
	requestResetPassword: Scalars['Boolean']['output'];
	resetPassword: Scalars['Boolean']['output'];
	user: UserType;
};

export type MutationChangePasswordArgs = {
	input: ChangePasswordInput;
};

export type MutationGetUploadUrlArgs = {
	input: GetUploadUrlInput;
};

export type MutationLoginArgs = {
	input: LoginInput;
};

export type MutationRegisterArgs = {
	input: RegisterInput;
};

export type MutationRequestResetPasswordArgs = {
	input: RequestResetPasswordInput;
};

export type MutationResetPasswordArgs = {
	input: ResetPasswordInput;
};

export type MutationUserArgs = {
	input: ProfileInput;
};

export type ProfileInput = {
	firstName: Scalars['String']['input'];
	lastName: Scalars['String']['input'];
};

export type Query = {
	me: UserType;
};

export type RegisterInput = {
	email: Scalars['String']['input'];
	firstName: Scalars['String']['input'];
	lastName: Scalars['String']['input'];
	password: Scalars['String']['input'];
	publicName: Scalars['String']['input'];
};

export type RequestResetPasswordInput = {
	email: Scalars['String']['input'];
};

export type ResetPasswordInput = {
	password: Scalars['String']['input'];
	repeatPassword?: InputMaybe<Scalars['String']['input']>;
	token: Scalars['String']['input'];
};

export type UserType = {
	created: Scalars['DateTime']['output'];
	email: Scalars['String']['output'];
	firstName: Scalars['String']['output'];
	id: Scalars['UUID']['output'];
	lastName: Scalars['String']['output'];
	publicName: Scalars['String']['output'];
	token: Scalars['String']['output'];
};

export type UserTypeWeb = {
	refreshToken: Scalars['String']['output'];
	token: Scalars['String']['output'];
	user: UserType;
};

export type RegisterMutationVariables = Exact<{
	input: RegisterInput;
}>;

export type RegisterMutation = {
	register: {
		id: string;
		created: string;
		firstName: string;
		lastName: string;
		email: string;
		publicName: string;
	};
};

export const RegisterDocument = gql`
    mutation register($input: RegisterInput!) {
  register(input: $input) {
    id
    created
    firstName
    lastName
    email
    publicName
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<
	RegisterMutation,
	RegisterMutationVariables
>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
	RegisterMutation,
	RegisterMutationVariables
>;
