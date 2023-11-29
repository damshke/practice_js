import HeaderContainer from '@containers/HeaderContainer';
import FooterContainer from '@containers/FooterContainer';
import Main from '@containers/Main';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { VACANCIES_KEY, API_URL } from '@scripts/const';
import { getMethod } from '@api/index';

// @ts-ignore next-line
export default function Home({ dehydrateState }) {
    return (
        <HydrationBoundary state={dehydrateState}>
            <HeaderContainer />
            <Main />
            <FooterContainer />
        </HydrationBoundary>
    );
}

export async function getServerSideProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [VACANCIES_KEY],
        queryFn: () => getMethod(`${API_URL}?page=0`),
    });

    return {
        props: {
            dehydrateState: dehydrate(queryClient),
        },
    };
}
