import { VacanciesParams } from './type';
import { URLHelper } from './utils';

export const getMethod = async (url: string, params?: VacanciesParams) => {
    const data = await fetch(params ? `${url}?${URLHelper(params.page, params.filters)}` : url);
    const response = await data.json();
    return response;
};
