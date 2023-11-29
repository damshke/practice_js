import { Container, scale } from '@greensight/gds';
import { MEDIA_QUERIES } from '@scripts/gds';
import Card from '@views/vacancies/Card';
import { Item } from '../../scripts/types';

export default function CardList({ vacancies }: { vacancies: Item[] }) {
    return (
        <Container css={{ minWidth: '100%' }}>
            <ul
                css={{
                    gap: scale(4),
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: scale(2),
                    [MEDIA_QUERIES.md]: {
                        padding: `0 ${scale(2)}px`,
                    },
                }}
            >
                {vacancies?.map(item => <Card key={item.id} vacancy={item} />)}
            </ul>
        </Container>
    );
}
