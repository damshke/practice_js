import { PER_PAGE } from '@scripts/const';
import { VacanciesParams } from './vacancies/types';

export function URLVacanciesHelper(params: VacanciesParams) {
    const search = {
        page: String(params.page),
        per_page: String(PER_PAGE),
    };
    if (params.filters?.schedule !== (undefined || ''))
        Object.assign(search, { schedule: String(params.filters?.schedule) });
    if (params.filters?.employment !== (undefined || ''))
        Object.assign(search, { employment: String(params.filters?.employment) });

    return new URLSearchParams(search).toString();
}
