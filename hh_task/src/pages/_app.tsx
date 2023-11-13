import type { AppProps } from 'next/app';
import { FC } from 'react';

import AppProviders from '@components/AppProviders';

const AppContent: FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

function MyApp(props: AppProps) {
    return (
        <AppProviders>
            <AppContent {...props} />
        </AppProviders>
    );
}

export default MyApp;
