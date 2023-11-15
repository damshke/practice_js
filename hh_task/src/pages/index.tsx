import useVacancies from '@api/vacancies';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import CardList from '@views/CardList';
import FeedbackForm from '@views/FeedbackForm';
import Filters from '@views/Filters';

export async function getStaticProps() {
    const queryClient = new QueryClient();

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

export default function Home() {
    const { isPending, isError, data, error } = useVacancies();

    if (isPending) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    return <div></div>;
}
