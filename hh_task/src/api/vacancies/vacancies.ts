import { API_URL, VACANCIES_KEY } from '@scripts/const';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { URLVacanciesHelper } from '@api/utils';
import { getMethod } from '..';
import { VacanciesParams } from './types/params';
import { Data } from './types/vacancy';

export function useVacancies(params: VacanciesParams) {
    return useQuery<Data, Error>({
        queryKey: [VACANCIES_KEY, params],
        queryFn: () => getMethod(`${API_URL}?${URLVacanciesHelper(params)}`),
        placeholderData: keepPreviousData,
    });
}
