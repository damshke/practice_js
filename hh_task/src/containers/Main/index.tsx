import FeedbackForm from '@views/FeedbackForm';
import CardList from '@containers/CardList';
import useVacancies from '@api/vacancies';
import Pagination from '@views/Pagination';
import { useState } from 'react';
import Filters from '@views/Filters';

export default function Main() {
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState(false);
    const pageSize = 5;

    const { isLoading, isError, error, data } = useVacancies(page, pageSize);

    return (
        <main>
            <Filters />
            {isLoading ? (
                <span>Loading...</span>
            ) : isError ? (
                <span>Error: {error.message}</span>
            ) : (
                <CardList vacancies={data.items} />
            )}
            <Pagination setPage={setPage} page={page} />
            <FeedbackForm />
        </main>
    );
}
