import { MEDIA_QUERIES, scale, typography } from '@scripts/gds';

export default function Header() {
    return (
        <header
            css={{
                gap: scale(5),
                padding: `${scale(8)}px ${scale(15)}px ${scale(5)}px ${scale(15)}px`,
                [MEDIA_QUERIES.md]: {
                    padding: `${scale(4)}px ${scale(2)}px ${scale(3)}px ${scale(2)}px`,
                },
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
