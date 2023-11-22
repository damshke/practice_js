import { API_URL, VACANCIES_KEY } from '@api/const';
import { useQuery } from '@tanstack/react-query';

export const getVacancies = async () => {
    const data = await fetch(API_URL);
    const response = await data.json();
    return response;
};

export default function useVacancies() {
    return useQuery({
        queryKey: [VACANCIES_KEY],
        queryFn: () => getVacancies(),
    });
}
