import { API_URL, VACANCIES_KEY } from '@scripts/const';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { URLVacanciesHelper } from '@api/utils';
import { getMethod } from '..';
import { VacanciesParams } from './types/vacancies';

export function useVacancies(params: VacanciesParams) {
    return useQuery({
        queryKey: [VACANCIES_KEY, params],
        queryFn: () => getMethod(`${API_URL}?${URLVacanciesHelper(params)}`),
        placeholderData: keepPreviousData,
    });
}
