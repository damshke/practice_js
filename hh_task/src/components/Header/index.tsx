import { MEDIA_QUERIES, scale, typography } from '@scripts/gds';

export default function Header() {
    return (
        <header
            css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: scale(5),
            }}
        >
            <h1
                css={{
                    ...typography('h1'),
                    [MEDIA_QUERIES.sm]: typography('h1'),
                }}
            >
                List of vacancies
            </h1>
        </header>
    );
}
