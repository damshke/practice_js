import { scale } from '@greensight/gds';
import { useState } from 'react';
import useVacancies from '@api/vacancies';
import Pagination from '..';
import Card from './Card';
import { Item } from './types';

export default function CardList({ vacancies }: { vacancies: Item[] }) {
    return (
        <div>
            <ul css={{ gap: scale(4), display: 'flex', flexDirection: 'column', padding: `0 ${scale(15)}px` }}>
                {vacancies?.map(item => <Card key={item.id} vacancy={item} />)}
            </ul>
        </div>
    );
}
