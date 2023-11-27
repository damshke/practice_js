import { API_URL, VACANCIES_KEY, URLHelper } from '@api/const';
import { useQuery } from '@tanstack/react-query';

export const getVacancies = async (page: number, filters?: { employment: string; experience: string }) => {
    const params = URLHelper(page, filters);
    const data = await fetch(`${API_URL}?${params}`);
    const response = await data.json();
    return response;
};

export default function useVacancies(page: number, filters?: { employment: string; experience: string }) {
    return useQuery({
        queryKey: [VACANCIES_KEY, page, filters],
        queryFn: () => getVacancies(page, filters),
    });
}
