import Header from '@components/Header';
import Footer from '@components/Footer';
import FeedbackForm from '@views/FeedbackForm';
import Filters from '@views/Filters';
import CardList from '@views/CardList';
import useVacancies from '@api/vacancies';

export default function Home() {
    const { isPending, isError, data, error } = useVacancies();

    if (isPending) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    return (
        <>
            <main>
                <Header />
                <Filters />
                <CardList vacancies={data.items} />
                <FeedbackForm />
                <Footer />
            </main>
        </>
    );
}
