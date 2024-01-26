import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: [
		`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? ''}`,
		'schema.client.graphql/',
	],
	documents: ['src/graphql/**/*.graphql'],
	generates: {
		'./src/graphql/generated/types.ts': {
			plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
			config: {
				scalars: {
					Date: 'string',
					DateTime: 'string',
					GenericScalar: 'unknown',
					Upload: 'unknown',
					UUID: 'string',
					Decimal: 'number',
					JSONString: 'string',
				},
				strictScalars: true,
				skipTypename: true,
				maybeValue: 'T | undefined',
			},
		},
		'./src/graphql/generated/introspection.ts': {
			plugins: ['fragment-matcher'],
		},
		'./src/graphql/generated/schema.graphql': {
			plugins: ['schema-ast'],
		},
	},
	hooks: {
		afterAllFileWrite: 'prettier --write',
	},
};

export default config;
