import { API_URL, VACANCIES_KEY } from '@api/const';
import { useQuery } from '@tanstack/react-query';
import { getMethod } from '..';

export function useVacancies(page: number, filters?: { schedule: string; employment: string }) {
    return useQuery({
        queryKey: [VACANCIES_KEY, page, filters],
        queryFn: () => getMethod(API_URL, { page, filters }),
    });
}
