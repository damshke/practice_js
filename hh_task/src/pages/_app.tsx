import AppProviders from '@components/AppProviders';
import Footer from '@components/Footer';
import Header from '@components/Header';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

function AppContent({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <>
            <Head>
                <title>Job List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Список актуальных вакансий с платформы hh.ru" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Header />
                    {/* <Component {...pageProps} /> */}
                    <Footer />
                </Hydrate>
            </QueryClientProvider>
        </>
    );
}

function MyApp(props: AppProps) {
    return (
        <AppProviders {...props}>
            <AppContent {...props} />
        </AppProviders>
    );
}

export default MyApp;
