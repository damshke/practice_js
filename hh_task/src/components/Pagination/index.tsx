import Button from '@components/controls/Button';
import { typography } from '@scripts/gds';
import { Dispatch, SetStateAction } from 'react';

export default function Pagination({
    setPage,
    page,
    totalPages,
}: {
    setPage: Dispatch<SetStateAction<number>>;
    page: number;
    totalPages?: number;
}) {
    return (
        <div
            css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {page >= 1 ? <Button onClick={() => setPage(page - 1)}>←</Button> : <Button variant="nonactive">←</Button>}
            <span css={{ margin: '0 10px', ...typography('l') }}>{page + 1}</span>
            {totalPages !== undefined && page < totalPages && <Button onClick={() => setPage(page + 1)}>→ </Button>}
        </div>
    );
}
