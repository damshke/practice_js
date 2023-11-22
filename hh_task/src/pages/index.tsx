import FeedbackForm from '@views/FeedbackForm';
import CardList from '@containers/CardList';
import useVacancies from '@api/vacancies';
import Pagination from '@views/Pagination';
import { useCallback, useState } from 'react';
import Filters from '@views/Filters';
import HeaderContainer from '@containers/HeaderContainer';
import FooterContainer from '@containers/FooterContainer';

export default function Home() {
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState(false);
    const pageSize = 5;

    const { isLoading, isError, error, data } = useVacancies(page, pageSize);

    return (
        <main>
            <HeaderContainer />
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
            <FooterContainer />
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
