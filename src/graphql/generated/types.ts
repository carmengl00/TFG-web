import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	Date: { input: string; output: string };
	DateTime: { input: string; output: string };
	Time: { input: string; output: string };
	UUID: { input: string; output: string };
};

export type ChangePasswordInput = {
	currentPassword: Scalars['String']['input'];
	password: Scalars['String']['input'];
	repeatPassword?: InputMaybe<Scalars['String']['input']>;
};

export type DayAvailabilityInput = {
	day: Scalars['Date']['input'];
	endTime: Scalars['Time']['input'];
	startTime: Scalars['Time']['input'];
};

export type DayAvailabilityType = {
	day: Scalars['Date']['output'];
	endTime: Scalars['Time']['output'];
	id: Scalars['UUID']['output'];
	resource: ResourceType;
	startTime: Scalars['Time']['output'];
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

export type MonthInput = {
	month: Scalars['Int']['input'];
	year: Scalars['Int']['input'];
};

export type Mutation = {
	changePassword: Scalars['Boolean']['output'];
	/** Creates a day availability */
	createDayAvailability: DayAvailabilityType;
	/** Creates a resource */
	createResource: ResourceType;
	/** Delete a day availability */
	deleteDayAvailability: Scalars['Boolean']['output'];
	/** Delete your resource */
	deleteResource: Scalars['Boolean']['output'];
	getUploadUrl: MediaUploadUrlType;
	login: UserTypeWeb;
	logout: Scalars['Boolean']['output'];
	register: UserType;
	requestResetPassword: Scalars['Boolean']['output'];
	resetPassword: Scalars['Boolean']['output'];
	/** Updates a day availability */
	updateDayAvailability: DayAvailabilityType;
	/** Updates a resource */
	updateResource: ResourceType;
	user: UserType;
};

export type MutationChangePasswordArgs = {
	input: ChangePasswordInput;
};

export type MutationCreateDayAvailabilityArgs = {
	input: DayAvailabilityInput;
	resourceId: Scalars['UUID']['input'];
};

export type MutationCreateResourceArgs = {
	input: ResourceInput;
};

export type MutationDeleteDayAvailabilityArgs = {
	id: Scalars['UUID']['input'];
};

export type MutationDeleteResourceArgs = {
	id: Scalars['UUID']['input'];
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

export type MutationUpdateDayAvailabilityArgs = {
	input: UpdateDayAvailabilityInput;
};

export type MutationUpdateResourceArgs = {
	input: UpdateResourceInput;
};

export type MutationUserArgs = {
	input: ProfileInput;
};

export type PageInfoType = {
	hasNext: Scalars['Boolean']['output'];
	hasPrev: Scalars['Boolean']['output'];
	page: Scalars['Int']['output'];
	pages: Scalars['Int']['output'];
	totalResults: Scalars['Int']['output'];
};

export type PaginatedDayAvailabilityType = {
	edges: Array<DayAvailabilityType>;
	pageInfo: PageInfoType;
};

export type PaginatedResourceType = {
	edges: Array<ResourceType>;
	pageInfo: PageInfoType;
};

export type PaginationInput = {
	page?: InputMaybe<Scalars['Int']['input']>;
	pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type ProfileInput = {
	firstName: Scalars['String']['input'];
	lastName: Scalars['String']['input'];
};

export type Query = {
	me: UserType;
	/** Returns a list of your daily availabilities. */
	myDailyAvailability: PaginatedDayAvailabilityType;
	/** Returns a list of your resources. */
	myResources: PaginatedResourceType;
};

export type QueryMyDailyAvailabilityArgs = {
	input: MonthInput;
	pagination?: InputMaybe<PaginationInput>;
};

export type QueryMyResourcesArgs = {
	pagination?: InputMaybe<PaginationInput>;
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

export type ResourceInput = {
	availableTime: Scalars['Int']['input'];
	description: Scalars['String']['input'];
	endDate: Scalars['Date']['input'];
	location?: InputMaybe<Scalars['String']['input']>;
	name: Scalars['String']['input'];
	startDate: Scalars['Date']['input'];
};

export type ResourceType = {
	availableTime: Scalars['Int']['output'];
	description: Scalars['String']['output'];
	endDate: Scalars['Date']['output'];
	id: Scalars['UUID']['output'];
	location?: Maybe<Scalars['String']['output']>;
	name: Scalars['String']['output'];
	startDate: Scalars['Date']['output'];
	user: UserType;
};

export type UpdateDayAvailabilityInput = {
	dayAvailabilityId: Scalars['UUID']['input'];
	endTime: Scalars['Time']['input'];
	startTime: Scalars['Time']['input'];
};

export type UpdateResourceInput = {
	availableTime?: InputMaybe<Scalars['Int']['input']>;
	description?: InputMaybe<Scalars['String']['input']>;
	endDate?: InputMaybe<Scalars['Date']['input']>;
	location?: InputMaybe<Scalars['String']['input']>;
	name?: InputMaybe<Scalars['String']['input']>;
	resourceId: Scalars['UUID']['input'];
	startDate?: InputMaybe<Scalars['Date']['input']>;
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

export type LoginMutationVariables = Exact<{
	input: LoginInput;
}>;

export type LoginMutation = {
	login: {
		token: string;
		refreshToken: string;
		user: {
			id: string;
			firstName: string;
			lastName: string;
			email: string;
			publicName: string;
			created: string;
		};
	};
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

export type CreateResourceMutationVariables = Exact<{
	input: ResourceInput;
}>;

export type CreateResourceMutation = {
	createResource: {
		id: string;
		name: string;
		description: string;
		availableTime: number;
		startDate: string;
		endDate: string;
		location?: string | undefined;
		user: {
			id: string;
			firstName: string;
			lastName: string;
			email: string;
			publicName: string;
			created: string;
		};
	};
};

export type DeleteResourceMutationVariables = Exact<{
	id: Scalars['UUID']['input'];
}>;

export type DeleteResourceMutation = { deleteResource: boolean };

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
	me: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
		publicName: string;
		created: string;
		token: string;
	};
};

export type MyResourcesQueryVariables = Exact<{
	pagination?: InputMaybe<PaginationInput>;
}>;

export type MyResourcesQuery = {
	myResources: {
		pageInfo: {
			page: number;
			pages: number;
			totalResults: number;
			hasNext: boolean;
		};
		edges: Array<{
			id: string;
			name: string;
			description: string;
			availableTime: number;
			startDate: string;
			endDate: string;
			location?: string | undefined;
			user: { email: string };
		}>;
	};
};

export const LoginDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'login' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'input' },
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'LoginInput' },
						},
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'login' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'input' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'input' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'user' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'firstName' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'lastName' },
											},
											{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'publicName' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'created' },
											},
										],
									},
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'token' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'refreshToken' },
								},
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'register' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'input' },
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'RegisterInput' },
						},
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'register' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'input' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'input' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'created' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'publicName' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;

export const CreateResourceDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'createResource' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'input' },
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'ResourceInput' },
						},
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'createResource' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'input' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'input' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'availableTime' },
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'location' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'user' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'firstName' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'lastName' },
											},
											{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'publicName' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'created' },
											},
										],
									},
								},
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<
	CreateResourceMutation,
	CreateResourceMutationVariables
>;
export const DeleteResourceDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'deleteResource' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'deleteResource' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'id' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'id' },
								},
							},
						],
					},
				],
			},
		},
	],
} as unknown as DocumentNode<
	DeleteResourceMutation,
	DeleteResourceMutationVariables
>;

export const GetMeDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'getMe' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'me' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'publicName' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'created' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'token' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const MyResourcesDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'myResources' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'pagination' },
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'PaginationInput' },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'myResources' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'pagination' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'pagination' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'pageInfo' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'page' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'pages' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'totalResults' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'hasNext' },
											},
										],
									},
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'edges' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'description' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'availableTime' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'startDate' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'endDate' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'location' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'user' },
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'email' },
														},
													],
												},
											},
										],
									},
								},
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<MyResourcesQuery, MyResourcesQueryVariables>;
