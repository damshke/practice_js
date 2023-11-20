import { Item } from './types';

export function haveProp(item: any, key: string): string {
    if (item) {
        return Object.keys(item).includes(key) && item[key] !== null ? item[key] : 'Не найдено';
    }
    return 'Не найдено';
}

export default function getCardsInfo(vacancies: Item[]): Item[] {
    const cards: Item[] = vacancies?.map(item => {
        arrPosition.add(item?.area?.name);
        return {
            title: haveProp(item, 'name'),
            img: haveProp(item?.employer?.logo_urls, 'original'),
            description: haveProp(item?.schedule, 'name'),
            adress: haveProp(item?.area, 'name'),
            company_name: haveProp(item?.employer, 'name'),
            work_form: haveProp(item?.employment, 'name'),
            requirement: haveProp(item?.snippet, 'requirement'),
            responsibility: haveProp(item?.snippet, 'responsibility'),
            working_time_modes: haveProp(item?.working_time_modes[0], 'name'),
            id: haveProp(item, 'id'),
        };
    });
    return cards;
}
