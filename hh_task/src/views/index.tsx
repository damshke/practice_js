import Main from '@containers/Main';
import { useState } from 'react';
import { useVacancies } from '@api/vacancies';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { VACANCIES_KEY, API_URL } from '@scripts/const';
import { getMethod } from '@api/index';
import CardList from '@containers/CardList';
import Pagination from '@components/Pagination';
import Filters from './vacancies/Filters';
import FeedbackForm from './vacancies/FeedbackForm';

// @ts-ignore next-line
export default function Home({ dehydrateState }) {
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState({ schedule: '', employment: '' });

    const { isLoading, isError, error, data } = useVacancies({ page, filters });
    return (
        <HydrationBoundary state={dehydrateState}>
            <Main>
                <Filters onSubmit={setFilters} />
                {isLoading ? (
                    <span>Loading...</span>
                ) : isError ? (
                    <span>Error: {error.message}</span>
                ) : (
                    <div>
                        <CardList vacancies={data?.items} />
                        <Pagination setPage={setPage} page={page} totalPages={data?.pages} />
                    </div>
                )}
                <FeedbackForm />
            </Main>
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
