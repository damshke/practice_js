import FeedbackForm from '@views/FeedbackForm';
import CardList from '@containers/CardList';
import useVacancies from '@api/vacancies';
import Pagination from '@views/Pagination';
import { useMemo, useState, useCallback } from 'react';
import Filters from '@views/Filters';
import { Item } from '@helpers/types';

export default function Main() {
    const PER_PAGE = 5;
    const [page, setPage] = useState(0);
    const { isLoading, isError, error, data } = useVacancies();
    const [cards, setCards] = useState();

    const totalPages = data ? Math.ceil(data.items.length / PER_PAGE) : 0;

    const paginatedData = useMemo(() => {
        const start = page * PER_PAGE;
        return data ? data.items.slice(start, start + PER_PAGE) : [];
    }, [data, page]);

    const handleFilterSubmit = useCallback(
        ({ employment, experience }: { employment: string; experience: string }) => {
            const actualData = paginatedData.filter((item: Item) => {
                if (!employment) return item.experience === experience && item;
                if (!experience) return item.employment === employment && item;
                return item.employment === employment && item.experience === experience && item;
            });
            setCards(actualData);
            setPage(0);
        },
        [paginatedData]
    );

    return (
        <main>
            <Filters onSubmit={handleFilterSubmit} />
            {isLoading ? (
                <span>Loading...</span>
            ) : isError ? (
                <span>Error: {error.message}</span>
            ) : (
                <CardList vacancies={paginatedData} />
            )}
            <Pagination setPage={setPage} page={page} totalPages={totalPages} />
            <FeedbackForm />
        </main>
    );
}
