import useVacancies from '@api/vacancies';
import Button from '@components/controls/Button';
import { Dispatch, SetStateAction } from 'react';

export default function Pagination({ setPage, page }: { setPage: Dispatch<SetStateAction<number>>; page: number }) {
    const pageSize = 5;

    const { isLoading, isError, error, data, isFetching, isPreviousData } = useVacancies(page, pageSize);

    return (
        <div>
            <Button onClick={() => setPage(page - 1)} disabled={page <= 1}>
                Prev
            </Button>
            <span>page {page}</span>
            <Button onClick={() => setPage(page + 1)}>Next</Button>
        </div>
    );
}
