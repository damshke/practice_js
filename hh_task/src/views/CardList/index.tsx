import { scale } from '@greensight/gds';
import { MEDIA_QUERIES } from '@scripts/gds';
import Card from './Card';
import { Item } from './types';

export default function CardList({ vacancies }: { vacancies: Item[] }) {
    return (
        <div>
            <ul
                css={{
                    gap: scale(4),
                    display: 'flex',
                    flexDirection: 'column',
                    padding: `0 ${scale(15)}px`,
                    [MEDIA_QUERIES.sm]: {
                        padding: `0 ${scale(2)}px`,
                    },
                }}
            >
                {vacancies?.map(item => <Card key={item.id} vacancy={item} />)}
            </ul>
        </div>
    );
}
