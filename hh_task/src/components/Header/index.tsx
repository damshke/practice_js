import { MEDIA_QUERIES, scale, typography } from '@scripts/gds';

export default function Header() {
    return (
        <header
            css={{
                gap: scale(5),
                padding: `${scale(8)}px ${scale(15)}px ${scale(13)}px ${scale(15)}px`,
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
