import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { NextPage, NextPageContext } from 'next';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { AppInitialProps } from 'next/app';
import { useMemo } from 'react';

interface WithApolloProps extends AppInitialProps {
    apolloState: NormalizedCacheObject;
    session: Session;
}

export function initializeApollo(initialState: NormalizedCacheObject = {}) {
    const _apolloClient = new ApolloClient({
        uri: process.env.GRAPHQL_URL,
        cache: new InMemoryCache().restore(initialState || {}),
    });
    return _apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}

export default function withApollo(PageComponent: NextPage) {
    const WithApollo = ({ apolloState, session, pageProps }: WithApolloProps) => {
        const client = useApollo(apolloState);
        return (
            <SessionProvider session={session}>
                <ApolloProvider client={client}>
                    <PageComponent {...pageProps} />
                </ApolloProvider>
            </SessionProvider>
        );
    };
    if (typeof window === 'undefined') {
        WithApollo.getInitialProps = async (ctx: NextPageContext) => {
            const apolloClient = initializeApollo();
            let pageProps = {};

            if (PageComponent.getInitialProps) {
                pageProps = await PageComponent.getInitialProps(ctx);
            }
            if (ctx.res && ctx.res.finished) {
                return pageProps;
            }
            const apolloState = apolloClient.cache.extract();
            return {
                ...pageProps,
                apolloState,
            };
        };
    }
    return withApollo;
}
