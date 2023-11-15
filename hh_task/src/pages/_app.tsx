import AppProviders from '@components/AppProviders';
import Footer from '@components/Footer';
import Header from '@components/Header';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Vacancies list</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Список актуальных вакансий" />
                <meta name="keywords" content="hh, work, работа, вакансии, подработка" />
            </Head>
            <AppProviders>
                <Hydrate state={pageProps.dehydratedState}>
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                </Hydrate>
            </AppProviders>
        </>
    );
}
