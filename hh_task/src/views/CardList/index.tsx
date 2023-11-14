import { Section } from '@greensight/gds/types/src';
import Card from './Card';
import { Item } from './types';

export default function CardList({ vacancies }: { vacancies: Item[] }) {
    return (
        <Section>
            <ul>{vacancies?.map(item => <Card key={item.id} vacancy={item} />)}</ul>
        </Section>
    );
}
