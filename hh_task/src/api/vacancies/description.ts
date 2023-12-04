import { API_URL } from '@scripts/const';
import { useQuery } from '@tanstack/react-query';
import { getMethod } from '..';

export function useDescription(id: string) {
    return useQuery({
        queryKey: [id],
        queryFn: () => getMethod(`${API_URL}/${id}`),
    });
}
