import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: './src/app/graphql/route.ts',
    documents: 'src/**/*.{ts,tsx,graphql}',
    generates: {
        'src/__generated__/': {
            preset: 'client',
            plugins: [],
        },
    },
};

export default config;
