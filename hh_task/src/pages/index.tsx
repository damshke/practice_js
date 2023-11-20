import Header from '@components/Header';
import Footer from '@components/Footer';
import FeedbackForm from '@views/FeedbackForm';
import Filters from '@views/Filters';
import CardList from '@views/CardList';
import useVacancies from '@api/vacancies';
import Pagination from '@views/index';
import { useState } from 'react';
import Button from '@components/controls/Button';

export default function Home() {
    const [page, setPage] = useState(0);
    const pageSize = 5;

    const { isLoading, isError, error, data, isFetching, isPreviousData } = useVacancies(page, pageSize);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    return (
        <main>
            <Header />
            <Filters />
            <CardList vacancies={data.items} />
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
