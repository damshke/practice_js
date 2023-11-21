import Header from '@containers/Header';
import Footer from '@containers/Footer';
import FeedbackForm from '@views/FeedbackForm';
import CardList from '@views/CardList';
import useVacancies from '@api/vacancies';
import Pagination from '@views/Pagination';
import { useCallback, useState } from 'react';
import Filters from '@views/Filters';

export default function Home() {
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState(false);
    const pageSize = 5;

    const { isLoading, isError, error, data } = useVacancies(page, pageSize);

    const handleClearFilters = useCallback(() => {
        setFilters(false);
        setPage(0);
    }, [filters]);

    return (
        <main>
            <Header />
            <Filters handleClearFilters={handleClearFilters} />
            {isLoading ? (
                <span>Loading...</span>
            ) : isError ? (
                <span>Error: {error.message}</span>
            ) : (
                <CardList vacancies={data.items} />
            )}
            <Pagination setPage={setPage} page={page} />
            <FeedbackForm />
            <Footer />
        </main>
    );
}

export const getServerSideProps = async () => {
    const data = await fetch('https://api.hh.ru/vacancies?page=0&per_page=5');
    const initialData = await data.json();

    return {
        props: {
            initialData,
        },
    };
};
