import AppProviders from '@components/AppProviders';
import Header from '@components/Header';
import FooterContainer from '@containers/FooterContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { FC } from 'react';

// @ts-ignore next-line
const AppContent: FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

function MyApp(props: AppProps) {
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    },
                },
            })
    );

    return (
        <>
            <Head>
                <title>List Vacancies</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Список вакансий с hh.ru" />
                <meta name="keywords" content="hh, работа, вакансии, стажировка" />
            </Head>
            <AppProviders>
                <QueryClientProvider client={queryClient}>
                    <Header />
                    <AppContent {...props} />
                    <FooterContainer />
                </QueryClientProvider>
            </AppProviders>
        </>
    );
}

export default MyApp;
