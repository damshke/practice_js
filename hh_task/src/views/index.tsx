import Button from '@components/controls/Button';
import { useState } from 'react';

export default function Pagination() {
    const [page, setPage] = useState(0);

    const fetchProjects = (page = 0) => fetch(URL + page).then(res => res.json());

    const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery({
        queryKey: ['vacancies', page],
        queryFn: () => fetchProjects(page),
        keepPreviousData: true,
    });

    return <Button></Button>;
}
