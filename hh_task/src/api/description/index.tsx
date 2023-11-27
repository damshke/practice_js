import { API_URL } from '@api/const';
import { useQuery } from '@tanstack/react-query';
import { getMethod } from '..';

export default function useDescription(id: string) {
    return useQuery({
        queryKey: [id],
        queryFn: () => getMethod(`${API_URL}/${id}`),
    });
}
