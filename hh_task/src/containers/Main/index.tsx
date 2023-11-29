/* eslint-disable no-nested-ternary */
import FeedbackForm from '@views/vacancies/FeedbackForm';
import CardList from '@containers/CardList';
import Pagination from '@components/Pagination';
import { useState } from 'react';
import Filters from '@views/vacancies/Filters';
import { useVacancies } from '@api/vacancies';

export default function Main() {
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState({ schedule: '', employment: '' });

    const { isLoading, isError, error, data } = useVacancies({ page, filters });

    return (
        <main>
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
        </main>
    );
}
