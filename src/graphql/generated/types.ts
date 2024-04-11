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

export type CreateOrUpdateAvailabilityInput = {
	items: Array<DayAvailabilityInput>;
	resourceId: Scalars['UUID']['input'];
};

export type DayAvailabilityGroupType = {
	availabilities: Array<DayAvailabilityType>;
	day: Scalars['Date']['output'];
};

export type DayAvailabilityInput = {
	day: Scalars['Date']['input'];
	timeRange: Array<TimeRangeInput>;
};

export type DayAvailabilityType = {
	day: Scalars['Date']['output'];
	endTime: Scalars['Time']['output'];
	id: Scalars['UUID']['output'];
	resource: ResourceType;
	startTime: Scalars['Time']['output'];
};

export type GetSlotsInput = {
	day: Scalars['Date']['input'];
	resourceId: Scalars['UUID']['input'];
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
	resourceId: Scalars['UUID']['input'];
	year: Scalars['Int']['input'];
};

export type Mutation = {
	changePassword: Scalars['Boolean']['output'];
	/** Creates or updates day availability */
	createOrUpdateAvailability: Scalars['Boolean']['output'];
	/** Creates a resource */
	createResource: ResourceType;
	/** Deletes all availabilities from a resource */
	deleteAllAvailabilities: Scalars['Boolean']['output'];
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
	/** Updates a resource */
	updateResource: ResourceType;
	user: UserType;
};

export type MutationChangePasswordArgs = {
	input: ChangePasswordInput;
};

export type MutationCreateOrUpdateAvailabilityArgs = {
	input: CreateOrUpdateAvailabilityInput;
};

export type MutationCreateResourceArgs = {
	input: ResourceInput;
};

export type MutationDeleteAllAvailabilitiesArgs = {
	resourceId: Scalars['UUID']['input'];
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

export type PaginatedReservedSlotType = {
	edges: Array<ReservedSlotType>;
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
	/** Return an array of slots for a day */
	getSlots: Array<SlotType>;
	me: UserType;
	/** Returns a list of your daily availabilities. */
	myDailyAvailability: Array<DayAvailabilityGroupType>;
	/** Returns a list of your reserved slots. */
	myReservedSlots: PaginatedReservedSlotType;
	/** Returns a list of your resources. */
	myResources: PaginatedResourceType;
	/** Return a resource */
	resource: ResourceType;
	/** Return a resource from public name */
	resourceFromPublicName: Array<ResourceType>;
};

export type QueryGetSlotsArgs = {
	input: GetSlotsInput;
};

export type QueryMyDailyAvailabilityArgs = {
	input: MonthInput;
};

export type QueryMyReservedSlotsArgs = {
	pagination?: InputMaybe<PaginationInput>;
};

export type QueryMyResourcesArgs = {
	pagination?: InputMaybe<PaginationInput>;
};

export type QueryResourceArgs = {
	id: Scalars['UUID']['input'];
};

export type QueryResourceFromPublicNameArgs = {
	publicName: Scalars['String']['input'];
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

export type ReservedSlotType = {
	description: Scalars['String']['output'];
	email: Scalars['String']['output'];
	endTime: Scalars['Time']['output'];
	name: Scalars['String']['output'];
	resource: ResourceType;
	startTime: Scalars['Time']['output'];
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

export type SlotType = {
	endTime: Scalars['Time']['output'];
	reserved: Scalars['Boolean']['output'];
	startTime: Scalars['Time']['output'];
};

export type TimeRangeInput = {
	dayAvailabilityId?: InputMaybe<Scalars['UUID']['input']>;
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

export type CreateOrUpdateAvailabilityMutationVariables = Exact<{
	input: CreateOrUpdateAvailabilityInput;
}>;

export type CreateOrUpdateAvailabilityMutation = {
	createOrUpdateAvailability: boolean;
};

export type DeleteAllAvailabilitiesMutationVariables = Exact<{
	resourceId: Scalars['UUID']['input'];
}>;

export type DeleteAllAvailabilitiesMutation = {
	deleteAllAvailabilities: boolean;
};

export type DeleteDayAvailabilityMutationVariables = Exact<{
	id: Scalars['UUID']['input'];
}>;

export type DeleteDayAvailabilityMutation = { deleteDayAvailability: boolean };

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

export type UpdateResourceMutationVariables = Exact<{
	input: UpdateResourceInput;
}>;

export type UpdateResourceMutation = {
	updateResource: {
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

export type MyDailyAvailabilityQueryVariables = Exact<{
	input: MonthInput;
}>;

export type MyDailyAvailabilityQuery = {
	myDailyAvailability: Array<{
		day: string;
		availabilities: Array<{
			id: string;
			startTime: string;
			endTime: string;
			resource: { name: string };
		}>;
	}>;
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

export type ResourceQueryVariables = Exact<{
	id: Scalars['UUID']['input'];
}>;

export type ResourceQuery = {
	resource: {
		id: string;
		name: string;
		description: string;
		availableTime: number;
		startDate: string;
		endDate: string;
		location?: string | undefined;
		user: { email: string; firstName: string; lastName: string };
	};
};

export type ResourceFromPublicNameQueryVariables = Exact<{
	publicName: Scalars['String']['input'];
}>;

export type ResourceFromPublicNameQuery = {
	resourceFromPublicName: Array<{
		id: string;
		name: string;
		description: string;
		availableTime: number;
		startDate: string;
		endDate: string;
		location?: string | undefined;
		user: { firstName: string; lastName: string };
	}>;
};

export type GetSlotsQueryVariables = Exact<{
	input: GetSlotsInput;
}>;

export type GetSlotsQuery = {
	getSlots: Array<{ startTime: string; endTime: string; reserved: boolean }>;
};

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
export const CreateOrUpdateAvailabilityDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'createOrUpdateAvailability' },
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
							name: { kind: 'Name', value: 'CreateOrUpdateAvailabilityInput' },
						},
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'createOrUpdateAvailability' },
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
					},
				],
			},
		},
	],
} as unknown as DocumentNode<
	CreateOrUpdateAvailabilityMutation,
	CreateOrUpdateAvailabilityMutationVariables
>;
export const DeleteAllAvailabilitiesDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'deleteAllAvailabilities' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'resourceId' },
					},
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
						name: { kind: 'Name', value: 'deleteAllAvailabilities' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'resourceId' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'resourceId' },
								},
							},
						],
					},
				],
			},
		},
	],
} as unknown as DocumentNode<
	DeleteAllAvailabilitiesMutation,
	DeleteAllAvailabilitiesMutationVariables
>;
export const DeleteDayAvailabilityDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'deleteDayAvailability' },
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
						name: { kind: 'Name', value: 'deleteDayAvailability' },
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
	DeleteDayAvailabilityMutation,
	DeleteDayAvailabilityMutationVariables
>;
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
export const UpdateResourceDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'updateResource' },
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
							name: { kind: 'Name', value: 'UpdateResourceInput' },
						},
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'updateResource' },
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
	UpdateResourceMutation,
	UpdateResourceMutationVariables
>;
export const MyDailyAvailabilityDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'myDailyAvailability' },
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
							name: { kind: 'Name', value: 'MonthInput' },
						},
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'myDailyAvailability' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'day' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'availabilities' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'resource' },
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'name' },
														},
													],
												},
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'startTime' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'endTime' },
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
	MyDailyAvailabilityQuery,
	MyDailyAvailabilityQueryVariables
>;
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
export const ResourceDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'resource' },
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
						name: { kind: 'Name', value: 'resource' },
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
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'user' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'firstName' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'lastName' },
											},
										],
									},
								},
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
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<ResourceQuery, ResourceQueryVariables>;
export const ResourceFromPublicNameDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'resourceFromPublicName' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'publicName' },
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' },
						},
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'resourceFromPublicName' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'publicName' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'publicName' },
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
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'firstName' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'lastName' },
											},
										],
									},
								},
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
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<
	ResourceFromPublicNameQuery,
	ResourceFromPublicNameQueryVariables
>;
export const GetSlotsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'getSlots' },
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
							name: { kind: 'Name', value: 'GetSlotsInput' },
						},
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'getSlots' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'startTime' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'endTime' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'reserved' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<GetSlotsQuery, GetSlotsQueryVariables>;
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
