import useVacancies from '@api/vacancies';
import Button from '@components/controls/Button';
import { useState } from 'react';

export default function Pagination() {
    const [page, setPage] = useState(0);

    const { isLoading, isError, error, data, isFetching, isPreviousData } = useVacancies(page);

    return <Button>Show more</Button>;
}
