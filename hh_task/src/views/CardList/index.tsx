import { scale, Section } from '@greensight/gds';
import Card from './Card';
import { Item } from './types';

export default function CardList({ vacancies }: { vacancies: Item[] }) {
    return (
        <ul css={{ gap: scale(4), display: 'flex', flexDirection: 'column', padding: `0 ${scale(15)}px` }}>
            {vacancies?.map(item => <Card key={item.id} vacancy={item} />)}
        </ul>
    );
}
