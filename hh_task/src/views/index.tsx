import HeaderContainer from '@containers/HeaderContainer';
import FooterContainer from '@containers/FooterContainer';
import Main from '@containers/Main';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { VACANCIES_KEY } from '@api/const';
import { getVacancies } from '@api/vacancies';

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
    await queryClient.prefetchQuery({ queryKey: [VACANCIES_KEY], queryFn: () => getVacancies(0) });
    return {
        props: {
            dehydrateState: dehydrate(queryClient),
        },
    };
}
