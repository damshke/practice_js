import FeedbackForm from '@views/FeedbackForm';
import CardList from '@containers/CardList';
import useVacancies from '@api/vacancies';
import Pagination from '@views/Pagination';
import { useState } from 'react';
import Filters from '@views/Filters';

export default function Main() {
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState({ employment: '', experience: '' });

    const { isLoading, isError, error, data } = useVacancies(page, filters);

    return (
        <main>
            <Filters onSubmit={setFilters} />
            {isLoading ? (
                <span>Loading...</span>
            ) : isError ? (
                <span>Error: {error.message}</span>
            ) : (
                <div>
                    <CardList vacancies={data.items} />
                    <Pagination setPage={setPage} page={page} totalPages={data.pages} />
                </div>
            )}
            <FeedbackForm />
        </main>
    );
}
