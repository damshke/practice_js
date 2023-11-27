import { PER_PAGE } from './const';

export function URLHelper(page: number, filters?: { schedule: string; employment: string }) {
    const search = {
        page: String(page),
        per_page: String(PER_PAGE),
    };
    if (filters?.schedule !== (undefined || '')) Object.assign(search, { schedule: String(filters?.schedule) });
    if (filters?.employment !== (undefined || '')) Object.assign(search, { employment: String(filters?.employment) });

    return new URLSearchParams(search).toString();
}
