import { scale, Section } from '@greensight/gds';
import Card from './Card';
import { Item } from './types';

export default function CardList({ vacancies }: { vacancies: Item[] }) {
    return (
        <Section
            css={{
                display: 'flex',
                flexDirection: 'column',
                gap: scale(4),
            }}
        >
            <ul>{vacancies?.map(item => <Card key={item.id} vacancy={item} />)}</ul>
        </Section>
    );
}
