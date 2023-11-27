export const API_URL = 'https://api.hh.ru/vacancies';
export const FILTERS_URL = 'https://api.hh.ru/dictionaries';
export const VACANCIES_KEY = 'vacancies';
export const FILTERS_KEY = 'filters';
export const PER_PAGE = 5;

export function URLHelper(page: number, filters?: { employment: string; experience: string }) {
    const search = {
        page: String(page),
        per_page: String(PER_PAGE),
    };
    if (filters?.experience !== '') Object.assign(search, { experience: String(filters?.experience) });
    if (filters?.employment !== '') Object.assign(search, { employment: String(filters?.employment) });

    return new URLSearchParams(search).toString();
}
