import { API_URL, VACANCIES_KEY } from '@api/const';
import { useQuery } from '@tanstack/react-query';

const getVacancies = async (page: number, per_page: number) => {
    const data = await fetch(`${API_URL}?page=${page}&per_page=${per_page}`);
    const response = await data.json();
    return response;
};

export default function useVacancies(page: number, per_page: number) {
    return useQuery({
        queryKey: [VACANCIES_KEY, page, per_page],
        queryFn: () => getVacancies(page, per_page),
    });
}
