import HeaderContainer from '@containers/HeaderContainer';
import FooterContainer from '@containers/FooterContainer';
import Main from '@containers/Main';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getVacancies } from '@api/vacancies';
import { VACANCIES_KEY } from '@api/const';

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
    await queryClient.prefetchQuery(VACANCIES_KEY, () => getVacancies(0, 5));
    return {
        props: {
            dehydrateState: dehydrate(queryClient),
        },
    };
}
