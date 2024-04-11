import type { FieldFunctionOptions } from '@apollo/client';
import {
	MyResourcesQuery,
	MyResourcesQueryVariables,
} from '../generated/types';

export const typePolicies = {
	Query: {
		fields: {
			myResources: {
				keyArgs: [],
				merge(
					existing: MyResourcesQuery['myResources'],
					incoming: MyResourcesQuery['myResources'],
					options: FieldFunctionOptions
				) {
					const args = options?.args as MyResourcesQueryVariables;
					const page = args?.pagination?.page ?? 1;
					const pageSize = args?.pagination?.pageSize ?? 4;

					const mergedEdges = existing?.edges ? existing?.edges.slice(0) : [];
					for (let i = 0; i < incoming.edges.length; ++i) {
						mergedEdges[(page - 1) * pageSize + i] = incoming.edges[i];
					}

					return {
						pageInfo: incoming.pageInfo,
						edges: mergedEdges,
					};
				},
			},
		},
	},
};
