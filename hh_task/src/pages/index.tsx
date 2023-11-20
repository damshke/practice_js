import Header from '@components/Header';
import Footer from '@components/Footer';
import FeedbackForm from '@views/FeedbackForm';
import Filters from '@views/Filters';
import CardList from '@views/CardList';
import useVacancies from '@api/vacancies';
import Pagination from '@views/Pagination';
import { useState } from 'react';

export default function Home() {
    const [page, setPage] = useState(0);
    const pageSize = 5;

    const { isLoading, isError, error, data } = useVacancies(page, pageSize);

    return (
        <main>
            <Header />
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
